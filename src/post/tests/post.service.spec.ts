import { Test, TestingModule } from '@nestjs/testing';

import { PostService } from '../post.service';
import { PrismaService } from '../../prisma/prisma.service';

const prismaMock = {
  post: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
};
describe('PostService', () => {
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);

    prismaMock.post.findUnique.mockClear();
    prismaMock.post.findMany.mockClear();
  });

  describe('findAll', () => {
    it('should return users', async () => {
      const existingPosts = [
        {
          id: 'b782f98f-1cf8-41db-8365-841300e30308',
          title: 'Prisma Adds Support for MongoDB',
          content:
            'Support for MongoDB has been one of the most requested features since the initial release of...',
          createdAt: '2024-07-18T07:41:00.400Z',
          updatedAt: '2024-07-18T07:41:00.400Z',
          authorId: '9c7eb841-cb84-4b05-9487-9d29cb89f1a9',
        },
        {
          id: '54d026d8-851e-4a86-a29e-a8b57e860d9b',
          title: "What's new in Prisma? (Q1/22)",
          content:
            'Our engineers have been working hard, issuing new releases with many improvements...',
          createdAt: '2024-07-18T07:41:00.405Z',
          updatedAt: '2024-07-18T07:41:00.405Z',
          authorId: '9c7eb841-cb84-4b05-9487-9d29cb89f1a9',
        },
      ];

      prismaMock.post.findMany.mockResolvedValue(existingPosts);

      const result = await postService.findAll();
      expect(result).toEqual(existingPosts);
    });
  });

  describe('create', () => {
    it('should return new post', async () => {
      const createdPost = {
        id: 'b782f98f-1cf8-41db-8365-841300e30309',
        title: 'Prisma Adds Support for MySQL',
        content:
          'Support for MySQL has been one of the most requested features since the initial release of...',
        createdAt: '2024-07-18T07:41:00.400Z',
        updatedAt: '2024-07-18T07:41:00.400Z',
        authorId: '9c7eb841-cb84-4b05-9487-9d29cb89f1a9',
      };

      prismaMock.post.create.mockResolvedValue(createdPost);

      const result = await postService.create(
        {
          title: 'Prisma Adds Support for MySQL',
          content:
            'Support for MySQL has been one of the most requested features since the initial release of...',
        },
        '1c7eb841-cb84-4b05-9487-9d29cb89f1a1',
      );
      expect(result).toEqual(createdPost);
    });
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });
});
