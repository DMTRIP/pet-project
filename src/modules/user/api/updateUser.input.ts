import { InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  middleName?: string;

  @IsNotEmpty()
  @IsDate()
  birthdayDate?: Date;
}
