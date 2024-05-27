import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  IsEnum,
  IsOptional
} from 'class-validator';
import { Type } from 'class-transformer';
import { RoleIds } from 'src/role/enums/role.enum';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email.' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(['individual', 'company']) // Specify possible values for userType
  userType: string;

  @Type()
  readonly roles: RoleIds[];

  @IsNumber()
  @IsNotEmpty()
  public userId: string;

  @IsOptional() // Making height and weight optional
  @IsNumber()
  readonly height?: number;

  @IsOptional()
  @IsNumber()
  readonly weight?: number;
}
