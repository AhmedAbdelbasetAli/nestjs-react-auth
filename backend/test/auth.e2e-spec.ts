import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';

describe('Auth E2E Tests (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/signup should register a new user', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'test@example.com',
        name: 'Test User',
        password: 'Password1!',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('token');
      });
  });

  it('/auth/signin should login existing user', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'test@example.com',
        password: 'Password1!',
      })
      .expect(201);

    expect(res.body).toHaveProperty('token');
  });

  it('/auth/signup should fail with invalid email', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'invalid-email',
        name: 'Test',
        password: 'Password1!',
      })
      .expect(400);
  });
});

function beforeAll(arg0: () => Promise<void>) {
    throw new Error('Function not implemented.');
}


function afterAll(arg0: () => Promise<void>) {
    throw new Error('Function not implemented.');
}


function expect(body: any) {
    throw new Error('Function not implemented.');
}
