import { RemoteAutentication } from "@/data/usecases/autentication/remote-autentication"
import { AxiosHttpClient } from "@/infra/http/axios-http-client/axios-http-client"
import { Login } from "@/presentation/pages"
import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationComposite } from "@/validation/validators"
import React from "react"

export const makeLogin: React.FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAutentication(url, axiosHttpClient)
  const validationComposite = new ValidationComposite([
    new RequiredFieldValidation('email'),
    new EmailValidation('email'),
    new RequiredFieldValidation('password'),
    new MinLengthValidation('password', 5)
  ])
return(
  <Login authentication={remoteAuthentication} validation={validationComposite}/>
)
}