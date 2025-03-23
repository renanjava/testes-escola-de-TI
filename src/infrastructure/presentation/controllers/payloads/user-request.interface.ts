import { IUserPayload } from '@/application/presentation/controllers/payloads/user-payload.interface'
import { Request } from 'express'

export interface IUserRequest extends Request {
  user: IUserPayload
}
