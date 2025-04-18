import { Transform, Type } from 'class-transformer';
import {
	IsString,
	IsNumber,
	IsOptional,
	IsDefined,
	IsNotEmpty,
	Min,
} from 'class-validator';

export class UserRequest {
	@IsDefined({ message: 'name is a required field' })
	@IsNotEmpty()
	@IsString({ message: 'name must be a string' })
	name!: string;

	@IsDefined({ message: 'id is required' })
	@Min(1, { message: 'id must be a valid number greater than 0' })
	@Type(() => Number)
	@IsNumber({}, { message: 'id must be a valid number' })
	id!: number;

	@IsOptional()
	@Min(1, { message: 'age must not be empty' })
	@Type(() => Number)
	@IsNumber({}, { message: 'age must be a Number' })
	age?: number;
}
