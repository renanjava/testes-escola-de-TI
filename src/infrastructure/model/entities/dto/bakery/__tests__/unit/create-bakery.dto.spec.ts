import { CreateBakeryDto } from '@/infrastructure/model/entities/dto/bakery/create-bakery.dto'

describe('CreateBakeryDto', () => {
  it('should create a valid bakery DTO with all required fields', () => {
    const name = 'Sweet Bakery'
    const cnpj = '12.345.678/0001-90'
    const address = '123 Main Street'
    const startedTime = new Date('2023-01-01T08:00:00')
    const endTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      startedTime,
      endTime,
    )

    expect(bakeryDto.name).toBe(name)
    expect(bakeryDto.cnpj).toBe(cnpj)
    expect(bakeryDto.address).toBe(address)
    expect(bakeryDto.startedTime).toBe(startedTime)
    expect(bakeryDto.endTime).toBe(endTime)
  })

  it('should create a bakery DTO with empty string values', () => {
    const name = ''
    const cnpj = ''
    const address = ''
    const startedTime = new Date('2023-01-01T08:00:00')
    const endTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      startedTime,
      endTime,
    )

    expect(bakeryDto.name).toBe('')
    expect(bakeryDto.cnpj).toBe('')
    expect(bakeryDto.address).toBe('')
    expect(bakeryDto.startedTime).toBeInstanceOf(Date)
    expect(bakeryDto.endTime).toBeInstanceOf(Date)
  })

  it('should validate that name is a string when creating a bakery DTO', () => {
    const name = 'Sweet Bakery'
    const cnpj = '12.345.678/0001-90'
    const address = '123 Main Street'
    const startedTime = new Date('2023-01-01T08:00:00')
    const endTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      startedTime,
      endTime,
    )

    expect(typeof bakeryDto.name).toBe('string')
  })

  it('should validate cnpj as a string when creating a bakery DTO', () => {
    const name = 'Sweet Bakery'
    const cnpj = '12.345.678/0001-90'
    const address = '123 Main Street'
    const startedTime = new Date('2023-01-01T08:00:00')
    const endTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      startedTime,
      endTime,
    )

    expect(typeof bakeryDto.cnpj).toBe('string')
  })

  it('should validate endTime as a Date object when instantiated', () => {
    const name = 'Sweet Bakery'
    const cnpj = '12.345.678/0001-90'
    const address = '123 Main Street'
    const startedTime = new Date('2023-01-01T08:00:00')
    const endTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      startedTime,
      endTime,
    )

    expect(bakeryDto.endTime).toBeInstanceOf(Date)
  })

  it('should validate that startedTime is a Date object when creating a bakery DTO', () => {
    const name = 'Sweet Bakery'
    const cnpj = '12.345.678/0001-90'
    const address = '123 Main Street'
    const startedTime = new Date('2023-01-01T08:00:00')
    const endTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      startedTime,
      endTime,
    )

    expect(bakeryDto.startedTime).toBeInstanceOf(Date)
  })

  it('should validate address as a string when creating a bakery DTO', () => {
    const name = 'Sweet Bakery'
    const cnpj = '12.345.678/0001-90'
    const address = '123 Main Street'
    const startedTime = new Date('2023-01-01T08:00:00')
    const endTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      startedTime,
      endTime,
    )

    expect(typeof bakeryDto.address).toBe('string')
  })

  it('should handle special characters in name and address fields correctly', () => {
    const name = 'Sweet & Co. Bakery'
    const cnpj = '12.345.678/0001-90'
    const address = '123 Main St., Apt #5'
    const startedTime = new Date('2023-01-01T08:00:00')
    const endTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      startedTime,
      endTime,
    )

    expect(bakeryDto.name).toBe(name)
    expect(bakeryDto.cnpj).toBe(cnpj)
    expect(bakeryDto.address).toBe(address)
    expect(bakeryDto.startedTime).toBe(startedTime)
    expect(bakeryDto.endTime).toBe(endTime)
  })

  it('should correctly handle timezone differences for Date fields', () => {
    const name = 'Sweet Bakery'
    const cnpj = '12.345.678/0001-90'
    const address = '123 Main Street'
    const startedTimeUTC = new Date('2023-01-01T08:00:00Z')
    const endTimeUTC = new Date('2023-01-01T18:00:00Z')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      startedTimeUTC,
      endTimeUTC,
    )

    expect(bakeryDto.startedTime.toISOString()).toBe(
      startedTimeUTC.toISOString(),
    )
    expect(bakeryDto.endTime.toISOString()).toBe(endTimeUTC.toISOString())
  })

  it('should handle very long string inputs for name, cnpj, and address', () => {
    const longString = 'a'.repeat(1000)
    const startedTime = new Date('2023-01-01T08:00:00')
    const endTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      longString,
      longString,
      longString,
      startedTime,
      endTime,
    )

    expect(bakeryDto.name).toBe(longString)
    expect(bakeryDto.cnpj).toBe(longString)
    expect(bakeryDto.address).toBe(longString)
    expect(bakeryDto.startedTime).toBe(startedTime)
    expect(bakeryDto.endTime).toBe(endTime)
  })

  it('should create a valid bakery DTO with edge date values', () => {
    const name = 'Edge Bakery'
    const cnpj = '98.765.432/0001-21'
    const address = '456 Edge Street'
    const startedTime = new Date('1970-01-01T00:00:00Z')
    const endTime = new Date('9999-12-31T23:59:59Z')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      startedTime,
      endTime,
    )

    expect(bakeryDto.name).toBe(name)
    expect(bakeryDto.cnpj).toBe(cnpj)
    expect(bakeryDto.address).toBe(address)
    expect(bakeryDto.startedTime).toBe(startedTime)
    expect(bakeryDto.endTime).toBe(endTime)
  })
})
