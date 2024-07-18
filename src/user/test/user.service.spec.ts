import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { UserService } from '../user.service';
import { PrismaService } from '../../prisma/prisma.service';

const prismaMock = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);

    prismaMock.user.findUnique.mockClear();
    prismaMock.user.findMany.mockClear();
  });

  describe('findAll', () => {
    it('should return users', async () => {
      const existingUsers = [
        {
          id: '1c7eb841-cb84-4b05-9487-9d29cb89f1a1',
          email: 'user01@testmail.com',
          role: 'USER',
          createdAt: '2024-07-18T06:09:15.510Z',
          updatedAt: '2024-07-18T06:09:15.510Z',
        },
        {
          id: '1c7eb841-cb84-4b05-9487-9d29cb89f1a2',
          email: 'user02@testmail.com',
          role: 'USER',
          createdAt: '2024-07-18T06:09:15.512Z',
          updatedAt: '2024-07-18T06:09:15.512Z',
        },
      ];

      prismaMock.user.findMany.mockResolvedValue(existingUsers);

      const result = await userService.findAll();
      expect(result).toEqual(existingUsers);
    });
  });

  describe('findOneByEmail', () => {
    it('should return user if exists', async () => {
      const existingUser = {
        id: '1c7eb841-cb84-4b05-9487-9d29cb89f1a1',
        email: 'user01@testmail.com',
        role: 'USER',
        createdAt: '2024-07-18T06:09:15.510Z',
        updatedAt: '2024-07-18T06:09:15.510Z',
      };

      prismaMock.user.findUnique.mockResolvedValue(existingUser);

      const result = await userService.findOneByEmail(existingUser.email);
      expect(result).toEqual(existingUser);
    });

    it('should throw NotFoundException if user not exists', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        userService.findOneByEmail('user000@testmail.com'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should return new user', async () => {
      const createdUser = {
        id: '1c7eb841-cb84-4b05-9487-9d29cb89f1a1',
        email: 'user01@testmail.com',
        role: 'USER',
        createdAt: '2024-07-18T06:09:15.510Z',
        updatedAt: '2024-07-18T06:09:15.510Z',
      };

      prismaMock.user.create.mockResolvedValue(createdUser);

      const result = await userService.create({
        email: 'user01@testmail.com',
        password: 'somepasswd',
      });
      expect(result).toEqual(createdUser);
    });
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
