import { jest } from '@jest/globals';
import { PrismaClient } from '@prisma/client';

export const prismaMock = {
  user: {
    findFirst: jest.fn(),  
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
} as unknown as PrismaClient;
