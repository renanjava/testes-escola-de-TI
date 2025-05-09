import type { IUserPayload } from '@/application/controllers/user-payload.interface'
import type IUseCases from '@/application/usecases/use-cases.interface'
import type { TokenProps } from '@/application/controllers/token-props.interface'
import type { IAccessToken } from '@/application/controllers/access-token.interface'

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
