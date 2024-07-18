import { User } from '@prisma/client';

import { AuthDto } from '../../auth/dto/auth.dto';

export const mockedUserEmail = 'mockedemail@test.com';
export const mockedPassword = 'testpasswd';

export const authDto: AuthDto = {
  email: mockedUserEmail,
  password: mockedPassword,
};

export const userApiDto: User = {
  ...authDto,
  id: expect.any(String),
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  role: 'USER',
};
