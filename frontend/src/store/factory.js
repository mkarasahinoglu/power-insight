import { defineStore } from "pinia"
import axiosInterceptor from "./axiosInterceptor"
const API_URL = import.meta.env.VITE_API_BASE_URL + "/factories"

export const factoryStore = defineStore('factory', {
  state: () => ({
  }),
  actions: {
    async getFactories() {
      return await axiosInterceptor.get(API_URL
      ).then(res => {
        return res.data
      }).catch(err => {
        Promise.reject(err)
      })
    }
  }
})