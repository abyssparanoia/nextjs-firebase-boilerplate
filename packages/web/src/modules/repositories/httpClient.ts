import { default as axios, AxiosResponse, AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'
import * as convertKeys from 'convert-keys'

export class HttpClient {
  private basedUrl: string
  private token?: string
  private convert?: boolean
  private axiosInstance: AxiosInstance

  public constructor({ url, token, convert }: { url: string; token?: string; convert?: boolean }) {
    this.basedUrl = url
    this.token = token
    this.convert = convert
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token ? `Bearer ${this.token}` : '',
      },
    })
  }

  public async get<T = any>(params: object = {}, option: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    if (this.convert) {
      params = convertKeys.toSnake(params)
    }

    const res = await this.axiosInstance.get(this.basedUrl, { params, ...option })
    if (this.convert) {
      res.data = convertKeys.toCamel(res.data)
    }
    return res
  }

  public async post<T = any>(params: object, option: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    if (this.convert) {
      params = convertKeys.toSnake(params)
    }

    const res = await this.axiosInstance.post(this.basedUrl, params, option)
    if (this.convert) {
      res.data = convertKeys.toCamel(res.data)
    }
    return res
  }

  public async put<T = any>(params: object, option: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    if (this.convert) {
      params = convertKeys.toSnake(params)
    }

    const res = await this.axiosInstance.put(this.basedUrl, params, option)
    if (this.convert) {
      res.data = convertKeys.toCamel(res.data)
    }
    return res
  }

  public async patch<T = any>(params: object, option: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    if (this.convert) {
      params = convertKeys.toSnake(params)
    }

    const res = await this.axiosInstance.patch(this.basedUrl, params, option)
    if (this.convert) {
      res.data = convertKeys.toCamel(res.data)
    }
    return res
  }

  public async delete<T = any>(): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete(this.basedUrl, {
      headers: { 'Content-Type': 'application/json', Authorization: this.token ? `Bearer ${this.token}` : '' },
      data: null,
    })
  }
}

interface ErrorResponse {
  message: string
  type: string
}

export class HttpError extends Error {
  private readonly axiosError: AxiosError
  public readonly type?: string

  constructor(error: AxiosError) {
    super(error.message)
    this.name = new.target.name
    this.axiosError = error
    Object.setPrototypeOf(this, new.target.prototype)

    if (this.axiosError.response) {
      const { message, type } = this.axiosError.response.data.error as ErrorResponse
      this.message = message
      this.type = type
    } else {
      this.message = 'アプリケーションエラーが発生しました'
    }
  }
}

export interface IPaginationRequest {
  page?: number
  limit?: number
}

export interface IPaginationResponse {
  max_page: number
  per_page: number
  current_page: number
}
