import { IUserPayload } from './user-payload.interface'
import { Request } from 'express'

export interface IUserRequest extends Request {
  user: IUserPayload
}
