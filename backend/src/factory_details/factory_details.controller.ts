import { Controller, Get, Put, Param, Body, Query } from "@nestjs/common"
import { FactoryDetailsService } from "./factory_details.service"
import { UpdateFactoryDetailsDto } from "./dto/updateFactoryDetails.dto"

@Controller("factories/:factoryId/details")
export class FactoryDetailsController{
  constructor(private readonly factoryDetailsService:FactoryDetailsService) {}

  @Get()
  async getFactoryDetails(@Param("factoryId") factoryId:string) {
    const factoryDetails = await this.factoryDetailsService.getFactoryDetails(factoryId)
    return factoryDetails
  }

  @Put(":id")
  async updateFactoryDetails(@Param("id") id:string, @Body() updateFactoryDetailsDto: UpdateFactoryDetailsDto) {
    const updatedFactoryDetails = await this.factoryDetailsService.updateFactoryDetails(id,updateFactoryDetailsDto)
    return updatedFactoryDetails
  }
}