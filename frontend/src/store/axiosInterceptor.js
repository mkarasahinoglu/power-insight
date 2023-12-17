import axios from "axios"
const axiosInterceptor = axios.create()

import router from "@/router"
import { refreshToken } from "./auth"


axiosInterceptor.interceptors.response.use((response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const newAccessToken = await refreshToken(() => {
        router.push("/")
        }
      )
      if(newAccessToken) {
        error.config.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInterceptor(error.config)
      }
    }
    Promise.reject(error);
})

axiosInterceptor.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user')) || {}
    const accessToken = user.accessToken || ''

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
)

export default axiosInterceptor