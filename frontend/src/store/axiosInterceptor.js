import axios from "axios"
const axiosInterceptor = axios.create()

import router from "@/router"
import { refreshToken } from "./auth"
import { useErrorStore } from "./error"
const errorStore = useErrorStore()

axiosInterceptor.interceptors.response.use((response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      const newAccessToken = await refreshToken(() => {
          errorStore.handleError("Session timed out")
          router.push("/")
        }
      )
      if(newAccessToken) {
        error.config.headers.Authorization = `Bearer ${newAccessToken}`
        errorStore.clearError()
        return axiosInterceptor(error.config)
      }
    }

    if(error?.response?.status === 500) {
      errorStore.handleError("Internal Server Error")
    }
    else if (error?.response?.status === 403) {
      errorStore.handleError("Session timed out")
    }
    else {
      errorStore.handleError(error.message)
    }
})

axiosInterceptor.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user')) || {}
    const accessToken = user.accessToken || ''

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    errorStore.clearError()
    return config
  },
  (error) => {
    errorStore.handleError(error.message)
  }
)

export default axiosInterceptor