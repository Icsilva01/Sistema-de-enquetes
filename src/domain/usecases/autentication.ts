import { AccountModel } from "domain/models/account-models"

type AutenticationParams = {
  email: string
  password: string
}

export interface Autentication {
auth (params: AutenticationParams): Promise<AccountModel>
}