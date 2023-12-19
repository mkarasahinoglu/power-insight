import { Controller, Get, Put, Param, Body, HttpException, Post, Delete } from "@nestjs/common"
import { FactoryListService } from "./factory_list.service"
import { UpdateFactoryDto } from "./dto/updateFactory.dto"

@Controller("factories")
export class FactoryListController {
	constructor(private readonly factoryListService: FactoryListService) {}

	@Get()
	async getFactories() {
		try {
			const factories = await this.factoryListService.getFactories()
			return factories
		}
		catch(err) {
			throw new HttpException(
        err.message,
        err.status
      )
		}
	}

	@Put(":id")
	async updateFactory(
		@Param("id") id: string,
		@Body() updateFactoryDto: UpdateFactoryDto
	) {
		try {
			const updatedFactory = await this.factoryListService.updateFactory(
				id,
				updateFactoryDto
			)
			return updatedFactory
		}
		catch(err) {
			throw new HttpException(
        err.message,
        err.status
      )
		}
	}

	@Post()
	async createFactory(
		@Body() updateFactoryDto: UpdateFactoryDto
	) {
		try {
			const createdFactory = await this.factoryListService.createFactory(
				updateFactoryDto
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
	async deleteFactory(@Param("id") id: string ) {
		try {
			const deletedFactory = await this.factoryListService.deleteFactory(id)
			return deletedFactory
		}
		catch(err) {
			throw new HttpException(
        err.message,
        err.status
      )
		}
	}
}
