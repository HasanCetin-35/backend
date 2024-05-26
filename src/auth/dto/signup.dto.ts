import {
  IsEmpty,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,MinLength,
  IsEnum,
  IsOptional
} from 'class-validator';
import { Type } from 'class-transformer';
import { RoleIds } from 'src/role/enums/role.enum';

// DTO for sign up
export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({},{message: 'Please enter correct email.'})
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(['individual', 'company']) // userType'ın alabileceği değerleri belirtin
  userType: string;
  
  @Type()
  readonly roles: RoleIds[];
  
  @IsNumber()
  @IsNotEmpty()
  public userId: string;

}
  