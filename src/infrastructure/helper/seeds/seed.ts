import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'renancvr777@gmail.com' },
    update: {},
    create: {
      realname: 'Renan Geraldini Leão',
      username: 'renan123',
      email: 'renancvr777@gmail.com',
      password: process.env.SEED_USER_PASSWORD!,
      role: 'ADMIN',
    },
  })

  console.log({ admin })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
