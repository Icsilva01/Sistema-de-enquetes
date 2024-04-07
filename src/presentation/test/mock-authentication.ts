import { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";
import { Autentication, AutenticationParams } from "@/domain/usecases";

export class AuthenticationSpy implements Autentication {
  account = mockAccountModel();
  params: AutenticationParams
  async auth(params: AutenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account);
  }
}