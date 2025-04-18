import {
	IsDefined,
	IsNotEmpty,
	IsEmail,
	IsString,
	IsOptional,
} from 'class-validator';

export class UserLoginRequest {
	@IsDefined({ message: 'email is a required field' })
	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsDefined({ message: 'password is a required field' })
	@IsNotEmpty()
	password!: string;
}

export class UserSignUpRequest {
	@IsDefined({ message: 'firstName is a required field' })
	@IsNotEmpty()
	firstName!: string;

	@IsDefined({ message: 'lastName is a required field' })
	@IsNotEmpty()
	lastName!: string;

	@IsDefined({ message: 'email is a required field' })
	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsDefined({ message: 'phone is a required field' })
	@IsNotEmpty()
	phone!: string;

	@IsDefined({ message: 'password is a required field' })
	@IsNotEmpty()
	password!: string;

	@IsOptional()
	dob?: string;

	@IsOptional()
	gender?: String;
}
