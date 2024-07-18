import { CreatePostDto } from '../dto/create-post.dto';

export const mockedPostTitle = 'post title';
export const mockedPostContent = 'test post content';

export const createPostDto: CreatePostDto = {
  title: mockedPostTitle,
  content: mockedPostContent,
};

export const postApiDto = {
  ...createPostDto,
  id: '3b4e9041-22d2-49eb-828a-b84919c7eff9',
  createdAt: '2024-07-18T11:17:53.478Z',
  updatedAt: '2024-07-18T11:17:53.478Z',
  authorId: '3b4e9041-22d2-49eb-828a-b84919c7eff8',
};

export const mockedPost = {
  title: mockedPostTitle,
  content: mockedPostContent,
  id: '3b4e9041-22d2-49eb-828a-b84919c7eff9',
  createdAt: '2024-07-18T11:17:53.478Z',
  updatedAt: '2024-07-18T11:17:53.478Z',
  authorId: '3b4e9041-22d2-49eb-828a-b84919c7eff8',
};
