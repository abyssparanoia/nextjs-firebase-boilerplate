import { default as axios, AxiosResponse } from 'axios'

export default class AxiosClient {
  public basedUrl: string
  public token?: string

  private readonly axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: this.token ? `Bearer ${this.token}` : ''
    }
  })

  public constructor({ url, token }: { url: string; token?: string }) {
    this.basedUrl = url
    this.token = token
  }

  public async get(params: object = {}, id?: string): Promise<AxiosResponse> {
    const url = id === undefined ? this.basedUrl : `${this.basedUrl}/${id}`
    return this.axiosInstance.get(url, { params })
  }

  public async post(params: object): Promise<AxiosResponse> {
    return this.axiosInstance.post(this.basedUrl, params)
  }

  public async put(params: object, id: string): Promise<AxiosResponse> {
    const url = `${this.basedUrl}/${id}`
    return this.axiosInstance.put(url, params)
  }

  public async patch(params: object, id: string): Promise<AxiosResponse> {
    const url = `${this.basedUrl}/${id}`
    return this.axiosInstance.patch(url, params)
  }

  public async delete(id: string): Promise<AxiosResponse> {
    const url = `${this.basedUrl}/${id}`
    return this.axiosInstance.delete(url)
  }
}
