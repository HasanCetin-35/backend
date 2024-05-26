import { IsNotEmpty, IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateExerciseAnalysisDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  exercise: string;

  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
