import { Controller, Post, Body, Headers, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UserDto } from '../users/dto/user.dto'
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: SignupDto })
  async signup(@Body() dto: SignupDto): Promise<{ token: string }> {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: SigninDto })
  async signin(@Body() dto: SigninDto): Promise<{ token: string }> {
    return this.authService.signin(dto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'User logout' })
  async logout(
    @Headers('authorization') authHeader: string,
  ): Promise<{ message: string }> {
    const token = authHeader?.split(' ')[1];
    if (token) {
      await this.authService.blacklistToken(token);
    }
    return { message: 'Logged out' };
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiResponse({ status: 200, description: 'User profile', type: UserDto })
  getProfile(): UserDto {
    return { email: 'user@example.com', id: '123456' };
  }
  
}