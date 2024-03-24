import { AutenticationParams } from "@/domain/usecases/autentication";
import { faker } from '@faker-js/faker'

export const mockAuthentication = (): AutenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})