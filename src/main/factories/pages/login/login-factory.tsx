import { Login } from "@/presentation/pages"
import React from "react"
import { makeRemoteAuthentication } from "../../usecases/authentication/remote-authentication-factory"
import { makeLocalSaveAccessToken } from "../../usecases/save-access-token/local-save-access-token-factory"
import { makeLoginValidation } from "./login-validation-factory"

export const makeLogin: React.FC = () => {
return(
  <Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} saveAccessToken={makeLocalSaveAccessToken()}/>
)
}