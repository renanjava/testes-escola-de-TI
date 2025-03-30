import { IUserPayload } from '@/application/controllers/interfaces/user-payload.interface'
import { Request } from 'express'

export interface IUserRequest extends Request {
  user: IUserPayload
}
