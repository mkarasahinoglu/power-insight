import axios from "axios"
const axiosInterceptor = axios.create()
import router from "@/router"
import { refreshToken } from "./auth"
import { useErrorStore } from "./error"
const errorStore = useErrorStore()
import { i18n } from "@/plugins/i18n"
const { t } = i18n.global

axiosInterceptor.interceptors.response.use((response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      const newAccessToken = await refreshToken(() => {
          errorStore.handleError(t("message.sessionTimeOut"))
          router.push("/")
        }
      )
      if(newAccessToken) {
        error.config.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInterceptor(error.config)
      }
    }
    if(error?.response?.status === 500) {
      errorStore.handleError(t("message.internalServerError"))
    }
    else if (error?.response?.status === 403) {
      errorStore.handleError(t("message.sessionTimeOut"))
      router.push("/")
    }
    else if(error?.response?.status === 401) {
      errorStore.handleError(t("message.sessionTimeOut"))
      router.push("/")
    }
    else if(error?.response?.status === 400) {
      errorStore.handleError(t("message.formatError"))
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
    return config
  },
  (error) => {
    errorStore.handleError(error.message)
  }
)

export default axiosInterceptor