import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';
import { Types } from 'mongoose';

export class CreateFoodAnalysisDto {
    @IsString()
    @IsNotEmpty()
    readonly _id: string; // _id alanı eklendi

    @IsString()
    @IsNotEmpty()
    readonly user: string;

    @IsString()
    @IsNotEmpty()
    readonly food: string;

    @IsDate()
    @IsNotEmpty()
    readonly date: Date;

    @IsNumber()
    @IsNotEmpty()
    readonly portion_size: number;
}
