import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { PostModule } from '../src/post/post.module';
import { PostService } from '../src/post/post.service';
import { postApiDto, mockedPost } from '../src/post/tests/post.test-data';

describe('Posts', () => {
  let app: INestApplication;
  const postService = {
    findAll: jest.fn(() => ({ data: [mockedPost], count: 1 })),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PostModule],
    })
      .overrideProvider(PostService)
      .useValue(postService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  // it(`/GET posts`, async () => {
  //   const response = await request(app.getHttpServer())
  //     .get('/posts')
  //     .expect(200);
  //   expect(response.body).toEqual({ data: [postApiDto], count: 1 });
  //   // .expect(postService.findAll())
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
