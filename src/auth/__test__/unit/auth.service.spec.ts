import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '@/user/user.service'
import * as bcrypt from 'bcrypt'
import { HttpException, HttpStatus } from '@nestjs/common'
import { AuthLoginProps } from '@/auth/dto/auth-login.dto'
import { AuthService } from '@/auth/auth.service'
import { AuthLoginDataBuilder } from '@/auth/dto/helper/auth-login-data-builder'
import { AuthRegisterProps } from '@/auth/dto/auth-register.dto'
import { AuthRegisterDataBuilder } from '@/auth/dto/helper/auth-register-data-builder'

describe('AuthService', () => {
  const mockUserService = {
    user: jest.fn(),
    createUser: jest.fn(),
  }

  const mockJwtService = {
    sign: jest.fn(),
  }

  let authService: AuthService
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userService: UserService
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let jwtService: JwtService
  let loginProps: AuthLoginProps
  let registerProps: AuthRegisterProps

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    userService = module.get<UserService>(UserService)
    jwtService = module.get<JwtService>(JwtService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('loginUser', () => {
    it('should return a token if login is successful', async () => {
      loginProps = AuthLoginDataBuilder({} as AuthLoginProps)

      mockUserService.user.mockResolvedValue({
        id: 1,
        username: loginProps.username,
        password: await bcrypt.hash(loginProps.password, 10),
      })
      mockJwtService.sign.mockReturnValue('mock_token')

      const result = await authService.loginUser(loginProps)

      expect(result.access_token).toEqual('mock_token')
      expect(mockUserService.user).toHaveBeenCalledWith({
        username: loginProps.username,
      })
      expect(mockJwtService.sign).toHaveBeenCalled()
    })

    it('should throw an error if user is not found', async () => {
      loginProps = AuthLoginDataBuilder({} as AuthLoginProps)

      mockUserService.user.mockResolvedValue(null)

      try {
        await authService.loginUser(loginProps)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.response).toBe('Usuário não encontrado')
        expect(e.status).toBe(HttpStatus.NOT_FOUND)
      }
    })

    it('should throw an error if password is invalid', async () => {
      loginProps = AuthLoginDataBuilder({
        password: 'senha-invalida',
      } as AuthLoginProps)

      const hashedPassword = await bcrypt.hash('password123', 10)

      mockUserService.user.mockResolvedValue({
        id: 1,
        username: loginProps.username,
        password: hashedPassword,
      })

      try {
        const result = await authService.loginUser(loginProps)
        expect(result).toBe(null)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.response).toBe('Senha inválida')
        expect(e.status).toBe(401)
      }
    })
  })

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      registerProps = AuthRegisterDataBuilder({} as AuthRegisterProps)

      const hashedPassword = await bcrypt.hash(registerProps.password, 10)

      mockUserService.user.mockResolvedValue(null)
      mockUserService.createUser.mockResolvedValue({
        ...registerProps,
        password: hashedPassword,
      })

      jest.spyOn(authService, 'hashPassword').mockResolvedValue(hashedPassword)

      const result = await authService.registerUser(registerProps)

      expect(result.username).toEqual(registerProps.username)
      expect(result.email).toEqual(registerProps.email)

      expect(mockUserService.createUser).toHaveBeenCalledWith({
        ...registerProps,
        password: hashedPassword,
      })
    })

    it('should throw an error if user already exists', async () => {
      registerProps = AuthRegisterDataBuilder({} as AuthRegisterProps)

      mockUserService.user.mockResolvedValue({ id: 1, ...registerProps })

      try {
        await authService.registerUser(registerProps)
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException)
        expect(e.response).toBe('Email ou Username já existe')
        expect(e.status).toBe(HttpStatus.BAD_REQUEST)
      }
    })
  })

  describe('hashPassword', () => {
    it('should hash the password correctly', async () => {
      const password = 'password123'
      const hashedPassword = await authService.hashPassword(password)

      expect(hashedPassword).not.toEqual(password)
      expect(await bcrypt.compare(password, hashedPassword)).toBe(true)
    })
  })

  describe('comparePasswords', () => {
    it('should return true if passwords match', async () => {
      const password = 'password123'
      const hashedPassword = await bcrypt.hash(password, 10)

      const result = await authService.comparePasswords(
        password,
        hashedPassword,
      )

      expect(result).toBe(true)
    })

    it('should return false if passwords do not match', async () => {
      const result = await authService.comparePasswords(
        'wrongpassword',
        'hashedpassword',
      )

      expect(result).toBe(false)
    })
  })
})
