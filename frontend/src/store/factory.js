import { defineStore } from "pinia"
import axiosInterceptor from "./axiosInterceptor"
const API_URL = import.meta.env.VITE_API_BASE_URL + "/factories"

export const factoryStore = defineStore('factory', {
  state: () => ({
  }),
  actions: {
    async getFactories() {
        const factories = await axiosInterceptor.get(API_URL)
        return factories?.data
    }
  }
})