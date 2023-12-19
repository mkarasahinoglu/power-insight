import { Controller, Get, Put, Param, Body, HttpException } from "@nestjs/common"
import { FactoryDetailsService } from "./factory_details.service"
import { UpdateFactoryDetailsDto } from "./dto/updateFactoryDetails.dto"

@Controller("factories/:factoryId/details")
export class FactoryDetailsController{
  constructor(private readonly factoryDetailsService:FactoryDetailsService) {}

  @Get()
  async getFactoryDetails(@Param("factoryId") factoryId:string) {
    try {
      const factoryDetails = await this.factoryDetailsService.getFactoryDetails(factoryId)
      return factoryDetails
    }
    catch(err) {
      throw new HttpException(
        err.message,
        err.status
      )
    }
  }

  @Put(":id")
  async updateFactoryDetails(@Param("id") id:string, @Body() updateFactoryDetailsDto: UpdateFactoryDetailsDto) {
    try {
      const updatedFactoryDetails = await this.factoryDetailsService.updateFactoryDetails(id,updateFactoryDetailsDto)
      return updatedFactoryDetails
    }
    catch(err) {
      throw new HttpException(
        err.message,
        err.status
      )
    }
  }
}