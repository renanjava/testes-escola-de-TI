import { IUserPayload } from '@/application/user/interfaces/user-payload.interface'
import { Request } from 'express'

export interface IUserRequest extends Request {
  user: IUserPayload
}
