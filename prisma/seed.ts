import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  if (!process.env.SEED_USER_EMAIL || !process.env.SEED_USER_PASSWORD) {
    throw new Error(
      'As variáveis de ambiente SEED_USER_EMAIL e SEED_USER_PASSWORD devem estar definidas.',
    )
  }
  const admin = await prisma.user.upsert({
    where: { email: process.env.SEED_USER_EMAIL },
    update: {},
    create: {
      realname: 'Renan Geraldini Leão',
      username: 'renan123',
      email: process.env.SEED_USER_EMAIL,
      password: await bcrypt.hash(process.env.SEED_USER_PASSWORD, 10),
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
