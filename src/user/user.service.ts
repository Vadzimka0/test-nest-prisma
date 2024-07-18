import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import type { User as UserType } from '@prisma/client';

import { AuthDto } from 'src/auth/dto/auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserData: AuthDto) {
    return this.prisma.user.create({
      data: createUserData,
    });
  }

  findAll(skip?: number, take?: number, query?: string) {
    return this.prisma.user.findMany({
      skip,
      take,
      where: {
        email: {
          contains: query,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        email: true,
        role: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string, currentUser: UserType) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (currentUser.role === Role.ADMIN || user.id === currentUser.id) {
      return user;
    }

    throw new ForbiddenException(
      'You do not have permission to act on this user',
    );
  }

  async findOneById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async update(
    id: string,
    currentUser: UserType,
    updateUserDto: UpdateUserDto,
  ) {
    await this.findOne(id, currentUser);

    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
      },
    });
  }

  async remove(id: string, currentUser: UserType) {
    await this.findOne(id, currentUser);

    return this.prisma.user.delete({ where: { id } });
  }
}
