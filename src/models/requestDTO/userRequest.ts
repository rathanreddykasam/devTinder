import { Exclude, Transform, Type } from 'class-transformer';
import {
	IsString,
	IsNumber,
	IsOptional,
	IsDefined,
	IsNotEmpty,
	Min,
	IsEmail,
	Max,
	IsDate,
} from 'class-validator';

export class UserRequest {
	@IsDefined({ message: 'email is a required field' })
	@IsNotEmpty()
	@IsEmail()
	email!: string;

	// @IsDefined({ message: 'id is required' })
	// @Min(1, { message: 'id must be a valid number greater than 0' })
	// @Type(() => Number)
	// @IsNumber({}, { message: 'id must be a valid number' })
	// id!: number;

	// @IsOptional()
	// @Min(1, { message: 'age must not be empty' })
	// @Type(() => Number)
	// @IsNumber({}, { message: 'age must be a Number' })
	// age?: number;
}

@Exclude()
export class UserEditRequest {
	@IsOptional()
	@Min(4, { message: 'firstName cannot be empty' })
	firstName!: string;

	@IsOptional()
	@Min(1, { message: 'lastName cannot be empty' })
	lastName!: string;

	@IsOptional()
	@Min(10, { message: 'Phone cannot be less than 10 numbers' })
	@Max(10, { message: 'Phone cannot be greater than 10 numbers' })
	@Type(() => Number)
	@IsNumber({}, { message: 'Phone must be a Number' })
	phone!: string;

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	dob?: Date;

	@IsOptional()
	@Min(1, { message: 'lastName cannot be empty' })
	gender?: String;
}
