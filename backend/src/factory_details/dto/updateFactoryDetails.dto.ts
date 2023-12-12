import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  Validate,
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
}