import { IsDefined, IsNotEmpty, IsEmail } from 'class-validator';

export class UserLoginRequest {
	@IsDefined({ message: 'email is a required field' })
	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsDefined({ message: 'password is a required field' })
	@IsNotEmpty()
	password!: string;
}
