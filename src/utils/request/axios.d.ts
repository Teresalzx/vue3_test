import axios, { Axios, AxiosResponse, AxiosRequestConfig } from 'axios'

declare module 'axios' {
    interface AxiosResponse<T = any> {
        token: string,
        status: number,
        code: number
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance
}