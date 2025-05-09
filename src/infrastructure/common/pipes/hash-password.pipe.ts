import { Injectable, PipeTransform } from '@nestjs/common'
import { Password } from '@/infrastructure/common/utils/password'

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(password: string) {
    return await Password.generateEncrypted(password, 10)
  }
}
