import {
	ValidatorConstraint,
	ValidatorConstraintInterface
} from "class-validator"

@ValidatorConstraint({
	name: "DateRange",
	async: false
})
export class DateRangeValidator implements ValidatorConstraintInterface {
	validate(value: string) {
		const dates = value.slice(1,22).split(",")
		const start_date = new Date(dates[0])
		const end_date = new Date(dates[1])
		return (
			start_date instanceof Date &&
			end_date instanceof Date &&
			start_date <= end_date
		)
	}
	defaultMessage(): string {
		return "Invalid date range"
	}
}
