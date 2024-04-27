import { LocalSaveAccessToken } from "@/data/usecases/save-access-token/local-save-access-token"
import { saveAccessToken } from "@/domain/usecases"
import { makeLocalStorageAdapter } from "../../cache/local-storage-adapter-factory"

export const makeLocalSaveAccessToken= (): saveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}