import { Controller, Get, Put, Param, Body, HttpException, Post, Delete } from "@nestjs/common"
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

  @Post()
	async createFactoryDetails(
    @Param("factoryId") factoryId:string,
		@Body() updateFactoryDetailsDto: UpdateFactoryDetailsDto
	) {
		try {
			const createdFactory = await this.factoryDetailsService.createFactoryDetails(
				factoryId,
        updateFactoryDetailsDto
			)
			return createdFactory
		}
		catch(err) {
			throw new HttpException(
        err.message,
        err.status
      )
		}
	}

  @Delete(":id")
	async deleteFactoryDetails(@Param("id") id: string ) {
		try {
			const deletedFactoryDetails = await this.factoryDetailsService.deleteFactoryDetails(id)
			return deletedFactoryDetails
		}
		catch(err) {
			throw new HttpException(
        err.message,
        err.status
      )
		}
	}
}