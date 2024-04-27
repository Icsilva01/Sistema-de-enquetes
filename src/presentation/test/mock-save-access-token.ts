import { saveAccessToken } from "@/domain/usecases/save-access-token"

export class SaveAccessTokenMock implements saveAccessToken {
  accessToken: string

async save (accessToken: string): Promise<void> {
    this.accessToken = accessToken
}
}