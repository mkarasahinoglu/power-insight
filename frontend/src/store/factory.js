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
    },
    async updateFactory(factoryId, updateFactoryModel) {
      const updatedFactory = await axiosInterceptor.put(API_URL + `/${factoryId.value}`, { 
        name: updateFactoryModel.name,
        membership_start_date: `${updateFactoryModel.membership_start_date}`,
        membership_end_date: `${updateFactoryModel.membership_end_date}`,
        employee_count: parseInt(updateFactoryModel.employee_count),
        free_membership: updateFactoryModel.free_membership
      })
      return !!updatedFactory
    },
    async createFactory(createFactoryModel) {
      const createdFactory = await axiosInterceptor.post(API_URL, {
        name: createFactoryModel.name,
        membership_start_date: `${createFactoryModel.membership_start_date}`,
        membership_end_date: `${createFactoryModel.membership_end_date}`,
        employee_count: parseInt(createFactoryModel.employee_count),
        free_membership: createFactoryModel.free_membership
      })
      return !!createdFactory
    },
    async deleteFactory(factoryId) {
      const deletedFactory = await axiosInterceptor.delete(API_URL + `/${factoryId}`)
      return !!deletedFactory
    }
  }
})