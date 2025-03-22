import { IUserPayload } from '../../../application/presentation/payloads/user-payload.interface'
import { Request } from 'express'

export interface IUserRequest extends Request {
  user: IUserPayload
}
