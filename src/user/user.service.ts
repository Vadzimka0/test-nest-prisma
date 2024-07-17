import { Injectable, UnprocessableEntityException } from '@nestjs/common';

// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

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
    });
  }

  async findOne(id: string) {
    //add current user id as arg

    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new UnprocessableEntityException(`User with id ${id} not found`);
    }
    //TODO:
    // if (userRole === Role.ADMIN || user.id === userId ) {
    return user;
    // }

    //   throw new ForbiddenException(
    //     'You do not have permission to delete this post',
    //   );
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id); //add current user id as parameter

    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id); //add current user id as parameter

    return this.prisma.user.delete({ where: { id } });
  }
}
