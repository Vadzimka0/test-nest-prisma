import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

import { JwtAuthGuard } from '../src/auth/guards';
import { UserModule } from '../src/user/user.module';
import { UserService } from '../src/user/user.service';
import { userApiDto } from '../src/user/test/user.test-data';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Users', () => {
  let app: INestApplication;
  const userService = { findAll: () => ({ data: [userApiDto], count: 1 }) };
  // let prisma: DeepMockProxy<PrismaClient>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule],
      providers: [PrismaService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideProvider(PrismaService)
      .useValue({})
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  // it(`/GET users`, () => {
  //   return request(app.getHttpServer()).get('/users').expect(200).expect({
  //     data: userService.findAll(),
  //   });
  // });

  // describe('GET /posts/:id', () => {
  //   it('should return 200 if the post is fetched', async () => {
  //     const response = await request(app.getHttpServer())
  //       .get('/posts/:id')
  //       .expect('Content-Type', /json/)
  //       .expect(200);
  //     expect(response.body).toEqual({ data: postApiDto });
  //   });
  // });

  afterAll(async () => {
    await app.close();
  });
});
