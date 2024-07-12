import { Request } from "express"

export interface MyRequest extends Request {
  uid?: string
  usuario?: any
}
