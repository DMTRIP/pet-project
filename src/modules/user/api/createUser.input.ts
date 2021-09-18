import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsDate, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  middleName?: string;

  @IsNotEmpty()
  @IsDate()
  birthdayDate: Date;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
