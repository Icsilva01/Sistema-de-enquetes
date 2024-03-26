import { AutenticationParams } from "@/domain/usecases";
import { faker } from '@faker-js/faker'
import { AccountModel } from "../models";

export const mockAuthentication = (): AutenticationParams => ({
  // Foi criado um email e um password fakes com o faker que será os parametros que iremos enviar
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  // Foi criado um accessToken fake com o faker que será o retorno do body que iremos receber
  accessToken: faker.string.uuid(),
})