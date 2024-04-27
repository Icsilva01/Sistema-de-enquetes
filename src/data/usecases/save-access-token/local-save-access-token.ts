import { SetStorage } from "@/data/protocols/cache/set-storage";
import { saveAccessToken } from "@/domain/usecases/save-access-token";


export class LocalSaveAccessToken implements saveAccessToken{
  constructor(private readonly setStorage: SetStorage) {}
  async save (accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
  }
}