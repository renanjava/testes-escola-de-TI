import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import type { INestApplication } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '@/infrastructure/common/modules/app.module'
import { execSync } from 'child_process'
import type { AuthRegisterProps } from '@/application/props/auth-register.props'
import { AuthRegisterDataBuilder } from '@/infrastructure/helper/databuilders/auth-register-data-builder'
import { JwtModule } from '@nestjs/jwt'

describe('Auth Controller Integration Tests', () => {
  let app: INestApplication
  let registerProps: AuthRegisterProps

  beforeAll(async () => {
    registerProps = AuthRegisterDataBuilder({} as AuthRegisterProps)
    execSync('npx prisma migrate deploy')

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, JwtModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

    await app.init()
  })

  afterAll(async () => {
    jest.resetAllMocks()
    await app.close()
    execSync('npx prisma migrate reset --force')
  })

  it('should register a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        realname: registerProps.realname,
        username: registerProps.username,
        email: registerProps.email,
        password: registerProps.password,
      })
    expect(response.status).toBe(201)
  })

  it('should fail to register a new user with invalid data', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        realname: '',
        username: '',
        email: 'invalid-email',
        password: '123',
      })
    expect(response.status).toBe(400)
  })

  it('should fail to register a new user with existing username or email', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        realname: registerProps.realname,
        username: registerProps.username,
        email: registerProps.email,
        password: registerProps.password,
      })
    expect(response.status).toBe(400)
  })

  it('should login an existing user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: registerProps.username,
        password: registerProps.password,
      })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('access_token')
  })

  it('should fail to login with incorrect password', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: registerProps.username,
        password: 'wrongpassword',
      })
    expect(response.status).toBe(401)
  })

  it('should fail to login with non-existing username', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'nonexistinguser',
        password: 'somepassword',
      })
    expect(response.status).toBe(404)
  })

  it('should fail to login with missing credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({})
    expect(response.status).toBe(400)
  })
})
