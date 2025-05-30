// Generated by Qodo Gen

import UserEntity from '@/domain/entities/user.entity'
import { UserAdapter } from '../../user.adapter'

describe('UserAdapter', () => {
  // toResponse creates a new UserEntity with password set to undefined
  it('should create a new UserEntity with password set to undefined', () => {
    // Arrange
    const user = new UserEntity(
      'John Doe',
      'johndoe',
      'john@example.com',
      'password123',
    )

    // Act
    const result = UserAdapter.toResponse(user)

    // Assert
    expect(result).toBeInstanceOf(UserEntity)
    expect(result.realname).toBe('John Doe')
    expect(result.username).toBe('johndoe')
    expect(result.email).toBe('john@example.com')
    expect(result.password).toBeUndefined()
  })

  // toResponse handles null or undefined entity properties
  it('should handle null or undefined entity properties', () => {
    // Arrange
    const user = new UserEntity(
      undefined as any,
      null as any,
      'john@example.com',
      'password123',
    )

    // Act
    const result = UserAdapter.toResponse(user)

    // Assert
    expect(result).toBeInstanceOf(UserEntity)
    expect(result.realname).toBeUndefined()
    expect(result.username).toBeNull()
    expect(result.email).toBe('john@example.com')
    expect(result.password).toBeUndefined()
  })
})
