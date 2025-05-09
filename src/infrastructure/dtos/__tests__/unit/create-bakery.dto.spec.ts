import { CreateBakeryDto } from '@/infrastructure/dtos/create-bakery.dto'

describe('CreateBakeryDto', () => {
  it('should create a valid bakery DTO with all required fields', () => {
    const name = 'Sweet Bakery'
    const cnpj = '12.345.678/0001-90'
    const address = '123 Main Street'
    const openTime = new Date('2023-01-01T08:00:00')
    const closeTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      openTime,
      closeTime,
    )

    expect(bakeryDto.name).toBe(name)
    expect(bakeryDto.cnpj).toBe(cnpj)
    expect(bakeryDto.address).toBe(address)
    expect(bakeryDto.openTime).toBe(openTime)
    expect(bakeryDto.closeTime).toBe(closeTime)
  })

  it('should create a bakery DTO with empty string values', () => {
    const name = ''
    const cnpj = ''
    const address = ''
    const openTime = new Date('2023-01-01T08:00:00')
    const closeTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      openTime,
      closeTime,
    )

    expect(bakeryDto.name).toBe('')
    expect(bakeryDto.cnpj).toBe('')
    expect(bakeryDto.address).toBe('')
    expect(bakeryDto.openTime).toBeInstanceOf(Date)
    expect(bakeryDto.closeTime).toBeInstanceOf(Date)
  })

  it('should validate that name is a string when creating a bakery DTO', () => {
    const name = 'Sweet Bakery'
    const cnpj = '12.345.678/0001-90'
    const address = '123 Main Street'
    const openTime = new Date('2023-01-01T08:00:00')
    const closeTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      openTime,
      closeTime,
    )

    expect(typeof bakeryDto.name).toBe('string')
  })

  it('should validate cnpj as a string when creating a bakery DTO', () => {
    const name = 'Sweet Bakery'
    const cnpj = '12.345.678/0001-90'
    const address = '123 Main Street'
    const openTime = new Date('2023-01-01T08:00:00')
    const closeTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      openTime,
      closeTime,
    )

    expect(typeof bakeryDto.cnpj).toBe('string')
  })

  it('should validate closeTime as a Date object when instantiated', () => {
    const name = 'Sweet Bakery'
    const cnpj = '12.345.678/0001-90'
    const address = '123 Main Street'
    const openTime = new Date('2023-01-01T08:00:00')
    const closeTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      openTime,
      closeTime,
    )

    expect(bakeryDto.closeTime).toBeInstanceOf(Date)
  })

  it('should validate that openTime is a Date object when creating a bakery DTO', () => {
    const name = 'Sweet Bakery'
    const cnpj = '12.345.678/0001-90'
    const address = '123 Main Street'
    const openTime = new Date('2023-01-01T08:00:00')
    const closeTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      openTime,
      closeTime,
    )

    expect(bakeryDto.openTime).toBeInstanceOf(Date)
  })

  it('should validate address as a string when creating a bakery DTO', () => {
    const name = 'Sweet Bakery'
    const cnpj = '12.345.678/0001-90'
    const address = '123 Main Street'
    const openTime = new Date('2023-01-01T08:00:00')
    const closeTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      openTime,
      closeTime,
    )

    expect(typeof bakeryDto.address).toBe('string')
  })

  it('should handle special characters in name and address fields correctly', () => {
    const name = 'Sweet & Co. Bakery'
    const cnpj = '12.345.678/0001-90'
    const address = '123 Main St., Apt #5'
    const openTime = new Date('2023-01-01T08:00:00')
    const closeTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      openTime,
      closeTime,
    )

    expect(bakeryDto.name).toBe(name)
    expect(bakeryDto.cnpj).toBe(cnpj)
    expect(bakeryDto.address).toBe(address)
    expect(bakeryDto.openTime).toBe(openTime)
    expect(bakeryDto.closeTime).toBe(closeTime)
  })

  it('should correctly handle timezone differences for Date fields', () => {
    const name = 'Sweet Bakery'
    const cnpj = '12.345.678/0001-90'
    const address = '123 Main Street'
    const openTimeUTC = new Date('2023-01-01T08:00:00Z')
    const closeTimeUTC = new Date('2023-01-01T18:00:00Z')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      openTimeUTC,
      closeTimeUTC,
    )

    expect(bakeryDto.openTime.toISOString()).toBe(openTimeUTC.toISOString())
    expect(bakeryDto.closeTime.toISOString()).toBe(closeTimeUTC.toISOString())
  })

  it('should handle very long string inputs for name, cnpj, and address', () => {
    const longString = 'a'.repeat(1000)
    const openTime = new Date('2023-01-01T08:00:00')
    const closeTime = new Date('2023-01-01T18:00:00')

    const bakeryDto = new CreateBakeryDto(
      longString,
      longString,
      longString,
      openTime,
      closeTime,
    )

    expect(bakeryDto.name).toBe(longString)
    expect(bakeryDto.cnpj).toBe(longString)
    expect(bakeryDto.address).toBe(longString)
    expect(bakeryDto.openTime).toBe(openTime)
    expect(bakeryDto.closeTime).toBe(closeTime)
  })

  it('should create a valid bakery DTO with edge date values', () => {
    const name = 'Edge Bakery'
    const cnpj = '98.765.432/0001-21'
    const address = '456 Edge Street'
    const openTime = new Date('1970-01-01T00:00:00Z')
    const closeTime = new Date('9999-12-31T23:59:59Z')

    const bakeryDto = new CreateBakeryDto(
      name,
      cnpj,
      address,
      openTime,
      closeTime,
    )

    expect(bakeryDto.name).toBe(name)
    expect(bakeryDto.cnpj).toBe(cnpj)
    expect(bakeryDto.address).toBe(address)
    expect(bakeryDto.openTime).toBe(openTime)
    expect(bakeryDto.closeTime).toBe(closeTime)
  })
})
