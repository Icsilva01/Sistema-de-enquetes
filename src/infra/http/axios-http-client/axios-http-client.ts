import { HttpPostParams } from "@/data/protocols/http";
import axios from 'axios'

export class AxiosHttpClient {
  async post(params: HttpPostParams<any>): Promise<void> {
    await axios.post(params.url)
    //dessa forma, consigo passar o axios com o valor correto que seria o params.url
  }
}