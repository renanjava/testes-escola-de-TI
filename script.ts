import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log("Usuários cadastrados:", users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
