import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '@/config/modules/app.module'
import { JwtService } from '@nestjs/jwt'
import { UserRole } from '@prisma/client'
import { ConfigService } from '@nestjs/config'
import { execSync } from 'child_process'

describe('RolesGuard Integration tests', () => {
  let app: INestApplication
  let jwtService: JwtService

  beforeAll(async () => {
    execSync('npx prisma migrate deploy')

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

    const configService = app.get(ConfigService)
    const databaseUrl = configService.get<string>('DATABASE_URL')
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined')
    }
    const updatedDatabaseUrl = databaseUrl.replace(
      'postgres:5432',
      'localhost:5432',
    )
    configService.set('DATABASE_URL', updatedDatabaseUrl)
    await app.init()

    jwtService = moduleFixture.get<JwtService>(JwtService)
  })

  afterAll(async () => {
    await app.close()
    execSync('npx prisma migrate reset --force')
  })

  it('should deny access when user does not have required role', async () => {
    const token = jwtService.sign({ role: [UserRole.USER] })

    const response = await request(app.getHttpServer())
      .get('/user/admin')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(403)
  })

  it('should deny access when JWT token is missing', async () => {
    const response = await request(app.getHttpServer()).get('/user')

    expect(response.status).toBe(401)
  })

  it('should deny access when JWT token is malformed', async () => {
    const response = await request(app.getHttpServer())
      .get('/user')
      .set('Authorization', 'Bearer malformedToken')

    expect(response.status).toBe(401)
  })
})
