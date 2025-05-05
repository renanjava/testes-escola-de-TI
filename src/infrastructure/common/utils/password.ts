import * as bcrypt from 'bcrypt'

export class Password {
  public static async generateEncrypted(
    password: string,
    salt: number,
  ): Promise<string> {
    return await bcrypt.hash(password, salt)
  }

  public static async verify(
    password: string,
    encrypted: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, encrypted)
  }
}
