import { defineStore } from "pinia"
import axios from "axios"
import axiosInterceptor from "./axiosInterceptor"
const API_URL = import.meta.env.VITE_API_BASE_URL + "/auth"

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
      return await axios.post(API_URL + "/register",
        user
      ).then(res => {
        if(res.data) {
          this.registerMessage=true
        }
      }).catch(err=> {
        const messages = err.response.data.message
        this.registerMessage=Array.isArray(messages) ? messages : [messages]
      })
    },
  
    async signin(user,rememberOption) {
      return await axios.post(API_URL + "/signin", {
        email: user.email,
        password: user.password
      }).then(res => {
        if(res.data.accessToken && res.data.refreshToken) {
          localStorage.setItem("user", JSON.stringify({
            email: user.email,
            name: res.data.userName,
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
      }).catch(err => {
        const messages = err.response.data.message
        this.loginMessage=Array.isArray(messages) ? messages : [messages]
      })
    },
  
    async signout() {
      const user = JSON.parse(localStorage.getItem("user"))
      
      return await axiosInterceptor.post(API_URL + "/signout", {
        email: user.email,
        refreshToken: user.refreshToken
      }).then(res => {
        if(res) {
          localStorage.removeItem("user")
          this.currentUserName = ""
          this.isLoggedin = false
        }
      }).catch(err => {
        Promise.reject(err)
      })
    },
  }
})

export const refreshToken= async (redirectCallBack) => {
  const auth = authStore()
  let existingUser = JSON.parse(localStorage.getItem("user"))
  if(!existingUser) auth.isLoggedin = false
  return await axios.post(API_URL + "/refreshToken",
    {refreshToken: existingUser.refreshToken}
  ).then(res => {
    if(res.data.newAccessToken) {
      existingUser.accessToken = res.data.newAccessToken
      const updatedUser = JSON.stringify(existingUser)
      localStorage.setItem("user", updatedUser)
      return existingUser.accessToken
    }
  }).catch(err => {
    localStorage.removeItem("user")
    auth.isLoggedin = false
    if(redirectCallBack) {
      redirectCallBack()
    }
  })
}