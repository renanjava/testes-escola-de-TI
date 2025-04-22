import type { IUserPayload } from '@/application/controllers/interfaces/user-payload.interface'
import type IUseCases from '../interfaces/use-cases.interface'
import type { TokenProps } from '@/application/controllers/interfaces/token-props.interface'
import type { IAccessToken } from '../../controllers/interfaces/access-token.interface'

export class GerarTokenUseCase implements IUseCases {
  constructor(private readonly iAccessToken: IAccessToken) {}
  execute(iUserPayload: IUserPayload): TokenProps {
    const payload = {
      username: iUserPayload.username,
      sub: iUserPayload.sub,
      role: iUserPayload.role,
    }
    return {
      access_token: this.iAccessToken.sign(payload),
    }
  }
}
