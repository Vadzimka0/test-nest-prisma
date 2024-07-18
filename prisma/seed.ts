import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create one ADMIN user
  const user1 = await prisma.user.upsert({
    where: { id: '9c7eb841-cb84-4b05-9487-9d29cb89f1a9' },
    update: {},
    create: {
      id: '9c7eb841-cb84-4b05-9487-9d29cb89f1a9',
      email: 'admin@testmail.com',
      password: '$2a$10$DU6Tl2SX3YWMp7sbxFAbFepVcqhsXo5dhbp43XgpJERSip3wf7V7G', //adminpasswd
      role: 'ADMIN',
    },
  });
  const user2 = await prisma.user.upsert({
    where: { id: '1c7eb841-cb84-4b05-9487-9d29cb89f1a1' },
    update: {},
    create: {
      id: '1c7eb841-cb84-4b05-9487-9d29cb89f1a1',
      email: 'user01@testmail.com',
      password: '$2a$10$PEMU8mfg1r4aSFrbgWhfz.kHBCAFsCd9uh3iV6iQUEblx9M6jWkhu', //somepasswd
      role: 'USER',
    },
  });
  const user3 = await prisma.user.upsert({
    where: { id: '1c7eb841-cb84-4b05-9487-9d29cb89f1a2' },
    update: {},
    create: {
      id: '1c7eb841-cb84-4b05-9487-9d29cb89f1a2',
      email: 'user02@testmail.com',
      password: '$2a$10$PEMU8mfg1r4aSFrbgWhfz.kHBCAFsCd9uh3iV6iQUEblx9M6jWkhu', //somepasswd
      role: 'USER',
    },
  });
  const user4 = await prisma.user.upsert({
    where: { id: '1c7eb841-cb84-4b05-9487-9d29cb89f1a3' },
    update: {},
    create: {
      id: '1c7eb841-cb84-4b05-9487-9d29cb89f1a3',
      email: 'user03@testmail.com',
      password: '$2a$10$PEMU8mfg1r4aSFrbgWhfz.kHBCAFsCd9uh3iV6iQUEblx9M6jWkhu', //somepasswd
      role: 'USER',
    },
  });
  const user5 = await prisma.user.upsert({
    where: { id: '1c7eb841-cb84-4b05-9487-9d29cb89f1a4' },
    update: {},
    create: {
      id: '1c7eb841-cb84-4b05-9487-9d29cb89f1a4',
      email: 'user04@testmail.com',
      password: '$2a$10$PEMU8mfg1r4aSFrbgWhfz.kHBCAFsCd9uh3iV6iQUEblx9M6jWkhu', //somepasswd
      role: 'USER',
    },
  });

  // create two dummy posts
  const post1 = await prisma.post.upsert({
    where: { id: 'b782f98f-1cf8-41db-8365-841300e30308' },
    update: {},
    create: {
      id: 'b782f98f-1cf8-41db-8365-841300e30308',
      title: 'Prisma Adds Support for MongoDB',
      content:
        'Support for MongoDB has been one of the most requested features since the initial release of...',
      authorId: '9c7eb841-cb84-4b05-9487-9d29cb89f1a9',
    },
  });

  const post2 = await prisma.post.upsert({
    where: { id: '54d026d8-851e-4a86-a29e-a8b57e860d9b' },
    update: {},
    create: {
      id: '54d026d8-851e-4a86-a29e-a8b57e860d9b',
      title: "What's new in Prisma? (Q1/22)",
      content:
        'Our engineers have been working hard, issuing new releases with many improvements...',
      authorId: '9c7eb841-cb84-4b05-9487-9d29cb89f1a9',
    },
  });

  console.log({ user1, user2, user3, user4, user5, post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
