import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsString()
  readonly _id: string;

  @IsNotEmpty()
  @IsString()
  readonly egzersiz_adi: string;

  @IsNotEmpty()
  @IsString()
  readonly egzersiz_turu: string;

  @IsNotEmpty()
  @IsNumber()
  readonly ortalama_yakilan_kalori: number;

  @IsNotEmpty()
  @IsString()
  readonly ortalama_sure: string;

  @IsNotEmpty()
  @IsString()
  readonly zorluk_seviyesi: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly gereken_ekipmanlar: string[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly hedeflenen_bolgeler: string[];
}



