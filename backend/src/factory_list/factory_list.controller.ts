import { Controller, Get, Post, Param, Body } from "@nestjs/common"
import { FactoryListService } from "./factory_list.service"
import { UpdateFactoryDto } from "./dto/updateFactory.dto"

@Controller("factories")
export class FactoryListController {
	constructor(private readonly factoryListService: FactoryListService) {}

	@Get()
	async getAllFactories() {
		const factories = await this.factoryListService.getFactories()
		return factories
	}

	@Post(":id")
	async updateFactory(
		@Param("id") id: string,
		@Body() updateFactoryDto: UpdateFactoryDto
	) {
		const updatedFactory = await this.factoryListService.updateFactory(
			id,
			updateFactoryDto
		)
		return updatedFactory
	}
}
