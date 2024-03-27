import { HttpPostClient, HttpPostParams, httpResponse } from "@/data/protocols/http";
import axios from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any>{
  async post(params: HttpPostParams<any>): Promise<httpResponse<any>> {
   const httpResponse = await axios.post(params.url, params.body)
    //dessa forma, consigo passar o axios com o valor correto que seria o params.url
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}