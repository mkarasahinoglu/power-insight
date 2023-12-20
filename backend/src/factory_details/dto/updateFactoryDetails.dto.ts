import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  Validate,
	IsOptional
} from "class-validator";
import { DateRangeValidator } from "src/middleware/DateRangeValidator"

export class UpdateFactoryDetailsDto {
	@IsNotEmpty()
	@IsString()
	using_unit: string

	@IsNotEmpty()
	@Validate(DateRangeValidator)
	date_range: [Date, Date]

	@IsNotEmpty()
	@IsNumber()
	usage_kw: number

	@IsNotEmpty()
	@IsNumber()
	usage_cost: number

	@IsNotEmpty()
	@IsBoolean()
	discount: boolean

	@IsOptional()
	@IsNumber()
	factory_id?: number
}