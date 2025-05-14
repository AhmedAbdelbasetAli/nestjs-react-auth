import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserDocument } from '../users/entities/user.entity';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  // In-memory blacklist (replace with Redis in production)
  private readonly blacklistedTokens = new Set<string>();

  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto): Promise<{ token: string }> {
    const { email, name, password } = dto;
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await this.userModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      email: normalizedEmail,
      name,
      password: hashedPassword,
    });

    const payload = { email: user.email, id: user._id };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async signin(dto: SigninDto): Promise<{ token: string }> {
    const { email, password } = dto;
    const normalizedEmail = email.toLowerCase().trim();

    const user = await this.userModel.findOne({ email: normalizedEmail });
    if (!user) throw new Error('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const payload = { email: user.email, id: user._id };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  // ✅ Add this method to handle logout
  async blacklistToken(token: string): Promise<void> {
    this.blacklistedTokens.add(token);
  }

  // ✅ Helper to check if token is blacklisted
  isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }


}