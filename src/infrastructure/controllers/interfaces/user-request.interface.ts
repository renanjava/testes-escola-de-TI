import type { IUserPayload } from '@/application/controllers/user-payload.interface'
import type { Request } from 'express'

export interface IUserRequest extends Request {
  user: IUserPayload
}
