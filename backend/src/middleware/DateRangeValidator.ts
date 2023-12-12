import {
	ValidatorConstraint,
	ValidatorConstraintInterface
} from "class-validator"

@ValidatorConstraint({
	name: "DateRange",
	async: false
})
export class DateRangeValidator implements ValidatorConstraintInterface {
	validate(value: any) {
		const [start_date, end_date] = value
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
