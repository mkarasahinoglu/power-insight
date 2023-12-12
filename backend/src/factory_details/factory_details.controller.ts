import { Controller, Get, Post, Param, Body, Query } from "@nestjs/common"
import { FactoryDetailsService } from "./factory_details.service"
import { UpdateFactoryDetailsDto } from "./dto/updateFactoryDetails.dto"

@Controller("factories/:id/details")
export class FactoryDetailsController{
  constructor(private readonly factoryDetailsService:FactoryDetailsService) {}

  @Get()
  async getFactoryDetails(@Param("id") id:string) {
    const factoryDetails = await this.factoryDetailsService.getFactoryDetails(id)
    return factoryDetails
  }

  @Post()
  async updateFactoryDetails(@Param("id") id:string, @Body() updateFactoryDetailsDto: UpdateFactoryDetailsDto) {
    console.log(updateFactoryDetailsDto)
    const updatedFactoryDetails = await this.factoryDetailsService.updateFactoryDetails(id,updateFactoryDetailsDto)
    return updatedFactoryDetails
  }

  @Get("sort")
  async sortColumn(@Param("id") id:string, @Query() query:any) {
    const {columnName, orderType}=query
    const sortedFactoryDetails = await this.factoryDetailsService.sortColumn(id,columnName,orderType)
    return sortedFactoryDetails
  }
}