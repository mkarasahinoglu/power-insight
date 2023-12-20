import { defineStore } from "pinia"
import axiosInterceptor from "./axiosInterceptor"
const API_URL = import.meta.env.VITE_API_BASE_URL + "/factories"

export const factoryDetailsStore = defineStore('factoryDetails', {
  state: () => ({
  }),
  actions: {
    async getFactoryDetails(factoryId) {
      const factoryDetails = await axiosInterceptor.get(API_URL + `/${factoryId}` + "/details")
      return factoryDetails?.data
    },
    async updateFactoryDetails(factoryId, factoryDetailsId, updateFactoryDetailsModel) {
      const updatedFactoryDetails = await axiosInterceptor.put(API_URL + `/${factoryId.value}` + "/details" + `/${factoryDetailsId.value}`, { 
        using_unit: updateFactoryDetailsModel.using_unit,
        date_range: await this.formatDateRange(updateFactoryDetailsModel.date_range),
        usage_kw: parseInt(updateFactoryDetailsModel.usage_kw),
        usage_cost: parseInt(updateFactoryDetailsModel.usage_cost),
        discount: updateFactoryDetailsModel.discount
      })
      return !!updatedFactoryDetails
    },
    async createFactoryDetails(factoryId, createFactoryDetailsModel) {
      const createdDetailsFactory = await axiosInterceptor.post(API_URL + `/${factoryId.value}` + "/details", {
        using_unit: createFactoryDetailsModel.using_unit,
        date_range: await this.formatDateRange(createFactoryDetailsModel.date_range),
        usage_kw: parseInt(createFactoryDetailsModel.usage_kw),
        usage_cost: parseInt(createFactoryDetailsModel.usage_cost),
        discount: createFactoryDetailsModel.discount,
        factory_id: factoryId.value
      })
      return !!createdDetailsFactory
    },
    async deleteFactoryDetails(factoryId, factoryDetailsId) {
      const deletedFactoryDetails = await axiosInterceptor.delete(API_URL + `/${factoryId}` + "/details" + `/${factoryDetailsId}`)
      return !!deletedFactoryDetails
    },
    async formatDateRange(displayDateRange) {
      const [startDate, endDate ] = await displayDateRange.split(" / ")
      return `[${startDate},${endDate})`
    }
  }
})