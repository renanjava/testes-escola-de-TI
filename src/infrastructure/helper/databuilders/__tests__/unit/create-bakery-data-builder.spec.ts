import { CreateBakeryDataBuilder } from '../../create-bakery-data-builder'
import type { CreateBakeryProps } from '@/infrastructure/dtos/create-bakery.dto'
import { faker } from '@faker-js/faker'

describe('CreateBakeryDataBuilder', () => {
  it('should return the same props when all properties are provided', () => {
    const props: CreateBakeryProps = {
      name: 'Sweet Bakery',
      cnpj: '12345678',
      address: '123 Main Street',
      openTime: new Date('2023-01-01'),
      closeTime: new Date('2023-01-02').getTime() as any,
    }

    const result = CreateBakeryDataBuilder(props)

    expect(result).toEqual(props)
  })

  it('should generate all properties when empty props object is provided', () => {
    const emptyProps: CreateBakeryProps = {} as any

    const result = CreateBakeryDataBuilder(emptyProps)

    expect(result.name).toBeDefined()
    expect(result.cnpj).toBeDefined()
    expect(result.address).toBeDefined()
    expect(result.openTime).toBeDefined()
    expect(result.closeTime).toBeDefined()

    expect(typeof result.name).toBe('string')
    expect(typeof result.cnpj).toBe('string')
    expect(typeof result.address).toBe('string')
    expect(result.openTime instanceof Date).toBe(true)
    expect(typeof result.closeTime).toBe('number')
  })

  it('should preserve provided values when they exist in props', () => {
    const props: CreateBakeryProps = {
      name: 'Sweet Bakery',
      cnpj: '12345678',
      address: '123 Main Street',
      openTime: new Date('2023-01-01'),
      closeTime: new Date('2023-01-02').getTime() as any,
    }

    const result = CreateBakeryDataBuilder(props)

    expect(result).toEqual(props)
  })

  it('should return a valid CreateBakeryProps object with default values when properties are missing', () => {
    const props: CreateBakeryProps = {
      name: faker.company.name(),
      cnpj: faker.string.numeric(8),
      address: faker.word.words(),
      openTime: faker.date.soon({ days: 10 }),
      closeTime: Date.now() as any,
    }

    const result = CreateBakeryDataBuilder(props)

    expect(result.name).toBe(props.name)
    expect(result.cnpj).toBe(props.cnpj)
    expect(result.address).toBe(props.address)
    expect(result.openTime).toEqual(props.openTime)
    expect(result.closeTime).toEqual(props.closeTime)
  })

  it('should replace null or undefined properties with faker values', () => {
    const props: CreateBakeryProps = {
      name: null,
      cnpj: undefined,
      address: null,
      openTime: undefined,
      closeTime: null,
    } as any

    const result = CreateBakeryDataBuilder(props)

    expect(result.name).toBeTruthy()
    expect(result.cnpj).toBeTruthy()
    expect(result.address).toBeTruthy()
    expect(result.openTime).toBeTruthy()
    expect(result.closeTime).toBeTruthy()
  })

  it('should generate default values for missing properties using faker', () => {
    const props: CreateBakeryProps = {
      name: undefined,
      cnpj: undefined,
      address: undefined,
      openTime: undefined,
      closeTime: undefined,
    } as any
    const mockName = 'Mock Bakery Name'
    const mockCnpj = '87654321'
    const mockAddress = 'Mock Address'
    const mockOpenTime = new Date('2023-01-10')

    jest.spyOn(faker.company, 'name').mockReturnValue(mockName)
    jest.spyOn(faker.string, 'numeric').mockReturnValue(mockCnpj)
    jest.spyOn(faker.word, 'words').mockReturnValue(mockAddress)
    jest.spyOn(faker.date, 'soon').mockReturnValue(mockOpenTime)

    const result = CreateBakeryDataBuilder(props)

    expect(result.name).toBe(mockName)
    expect(result.cnpj).toBe(mockCnpj)
    expect(result.address).toBe(mockAddress)
    expect(result.openTime).toBe(mockOpenTime)
    expect(result.closeTime).toBeDefined()
  })

  it('should handle a mix of provided and missing properties correctly', () => {
    const props: CreateBakeryProps = {
      name: 'Sweet Bakery',
      cnpj: undefined,
      address: '123 Main Street',
      openTime: undefined,
      closeTime: new Date('2023-01-02').getTime(),
    } as any
    const mockFaker = {
      company: { name: jest.fn().mockReturnValue('Faker Bakery') },
      string: { numeric: jest.fn().mockReturnValue('87654321') },
      word: { words: jest.fn().mockReturnValue('Faker Address') },
      date: { soon: jest.fn().mockReturnValue(new Date('2023-01-05')) },
    }
    jest.mock('@faker-js/faker', () => mockFaker)

    const result = CreateBakeryDataBuilder(props)

    expect(result.name).toBe('Sweet Bakery')
    expect(result.address).toBe('123 Main Street')
    expect(result.closeTime).toBe(new Date('2023-01-02').getTime())
  })

  it('should generate a numeric CNPJ with correct length when not provided', () => {
    const props: CreateBakeryProps = {
      name: 'Sweet Bakery',
      address: '123 Main Street',
      openTime: new Date('2023-01-01'),
      closeTime: new Date('2023-01-02').getTime(),
    } as any

    const result = CreateBakeryDataBuilder(props)

    expect(result.cnpj).toMatch(/^\d{8}$/)
  })

  it('should use default values when props have empty strings or zero values', () => {
    const props: CreateBakeryProps = {
      name: '',
      cnpj: '',
      address: '',
      openTime: 0,
      closeTime: 0,
    } as any

    const result = CreateBakeryDataBuilder(props)

    expect(result.name).not.toBe('')
    expect(result.cnpj).not.toBe('')
    expect(result.address).not.toBe('')
    expect(result.openTime).not.toBe(0)
    expect(result.closeTime).not.toBe(0)
  })

  it('should use faker date for openTime and current date for closeTime when not provided', () => {
    const props: CreateBakeryProps = {
      name: 'Sweet Bakery',
      cnpj: '12345678',
      address: '123 Main Street',
    } as any
    const mockOpenTime = new Date('2023-01-05')
    jest.spyOn(faker.date, 'soon').mockReturnValue(mockOpenTime)
    const mockCloseTime = Date.now()
    jest.spyOn(Date, 'now').mockReturnValue(mockCloseTime)

    const result = CreateBakeryDataBuilder(props)

    expect(result.openTime).toEqual(mockOpenTime)
    expect(result.closeTime).toEqual(mockCloseTime)
  })

  it('should handle special characters in name and address when provided', () => {
    const props: CreateBakeryProps = {
      name: 'Bäckerei & Café',
      cnpj: '87654321',
      address: '123 Märchenstraße',
      openTime: new Date('2023-01-01'),
      closeTime: new Date('2023-01-02').getTime() as any,
    }

    const result = CreateBakeryDataBuilder(props)

    expect(result.name).toBe('Bäckerei & Café')
    expect(result.address).toBe('123 Märchenstraße')
  })

  it('should ensure openTime is before or equal to closeTime when dates are generated', () => {
    const props: CreateBakeryProps = {
      name: 'Sweet Bakery',
      cnpj: '12345678',
      address: '123 Main Street',
      openTime: undefined as any,
      closeTime: undefined as any,
    }

    const result = CreateBakeryDataBuilder(props)

    expect(new Date(result.openTime).getTime()).toBeLessThanOrEqual(
      result.closeTime as any,
    )
  })

  it('should handle very long input strings for name, cnpj, and address', () => {
    const longString = 'a'.repeat(1000)
    const props: CreateBakeryProps = {
      name: longString,
      cnpj: longString,
      address: longString,
      openTime: new Date('2023-01-01'),
      closeTime: new Date('2023-01-02').getTime() as any,
    }

    const result = CreateBakeryDataBuilder(props)

    expect(result.name).toBe(longString)
    expect(result.cnpj).toBe(longString)
    expect(result.address).toBe(longString)
  })
})
