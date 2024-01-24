import { defineStore } from "pinia"
import axios from "axios"
import axiosInterceptor from "./axiosInterceptor"
const API_URL = import.meta.env.VITE_API_BASE_URL + "/auth"
import { i18n } from "@/plugins/i18n"
const { t } = i18n.global

export const authStore = defineStore('auth', {
  state: () => ({
    isLoggedin: JSON.parse(localStorage.getItem("user")) ? true: false,
    registerMessage: null,
    loginMessage: null,
    currentUserName: (JSON.parse(localStorage.getItem("user")) || {}).name || ""
  }),
  getters: {
    nameRules: () => ({
      required: (v) => !!v || "Required",
      min: (v) => v.length >=8 || "Should be at least 8 characters long",
      noNumeric: (v) => !/\d/.test(v) || 'Should not include numeric characters',
    }),
    passwordRules: () => ({
      required: (v) => !!v || "Required",
      length: (v) => v.length === 8 || "Should be 8 characters long",
      uppercase: (v) => /[A-Z]/.test(v) || 'At least one uppercase letter required',
      numeric: (v) => /\d/.test(v) || 'At least one numeric character required',
    }),
    emailRules: () => ({
      required: (v) => !!v || "Required",
      email: (v) => /.+@.+\..+/.test(v) || 'Please enter a valid email address'
    }),

    isLoggedIn: () => {
      isLoggedin = !!JSON.parse(localStorage.getItem("user"))
    },
  },
  actions: {
    async register(user) {
      try {
        const res = await axios.post(API_URL + "/register", user)
        this.registerMessage = res.data
      }
      catch(err) {
        if(err.response) {
          if(err.response.data.statusCode === 500) {
            this.registerMessage = t("message.internalServerError")
          }
          else if (err.response.data.statusCode === 409) {
            this.registerMessage = t("message.registerExistError")
          }
          else {
            this.registerMessage = t("message.registerError")
          }
        }
        else {
          this.registerMessage = t("message.networkError")
        }
      }
    },
    async signin(user,rememberOption) {
      try {
        const res = await axios.post(API_URL + "/signin", {
          email: user.email,
          password: user.password
        })
        localStorage.setItem("user", JSON.stringify({
          email: user.email,
          name: res.data.userName,
          role: res.data.userRole,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken
        }))
        if(rememberOption) {
          localStorage.setItem("rememberUser",JSON.stringify({email:user.email, password: user.password}))
        }
        else {
          localStorage.removeItem("rememberUser")
        }
        this.currentUserName = res.data.userName
        this.isLoggedin = true
      }
      catch(err) {
        if(err.response) {
          if(err.response.data.statusCode === 500) {
            this.loginMessage = t("message.internalServerError")
          }
          else {
            this.loginMessage = t("message.loginError")
          }
        }
        else {
          this.loginMessage = t("message.networkError")
        }
      }
    },
    async signout() {
        const user = JSON.parse(localStorage.getItem("user"))
        await axiosInterceptor.post(API_URL + "/signout", {
          email: user.email,
          refreshToken: user.refreshToken
        })
        localStorage.removeItem("user")
        this.currentUserName = ""
        this.isLoggedin = false
    }
  }
})

export const refreshToken= async (redirectCallBack) => {
  const auth = authStore()
  try {
    let existingUser = JSON.parse(localStorage.getItem("user"))
    if(!existingUser) {
      auth.isLoggedin = false
    }
    const res = await axiosInterceptor.post(API_URL + "/refreshToken",
      {refreshToken: existingUser.refreshToken}
    )
    existingUser.accessToken = res.data.newAccessToken
    const updatedUser = JSON.stringify(existingUser)
    localStorage.setItem("user", updatedUser)
    return existingUser.accessToken
  }
  catch(err) {
    localStorage.removeItem("user")
    auth.isLoggedin = false
    if(redirectCallBack) {
      redirectCallBack()
    }
  }
}