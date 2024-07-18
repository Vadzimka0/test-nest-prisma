import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import PrismaErrorCode from 'prisma/prismaErrorCode.enum';
import { UserService } from 'src/user/user.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { TokenPayload } from './types/token-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register({ email, password }: AuthDto) {
    try {
      const hashedPassword = await bcryptjs.hash(password, 10);

      await this.userService.create({
        email,
        password: hashedPassword,
      });

      return { data: 'registration completed' };
    } catch (error) {
      if (error?.code === PrismaErrorCode.UniqueViolation) {
        throw new UnprocessableEntityException('User already exists');
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async login({ email, password }: AuthDto): Promise<string> {
    try {
      const user = await this.userService.findOneByEmail(email);

      await this.verifyPassword(password, user.password);

      return this.getJwtToken(user.id);
    } catch (error) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordMatching = await bcryptjs.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  getJwtToken(id: string): string {
    const payload: TokenPayload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return token;
  }
}
