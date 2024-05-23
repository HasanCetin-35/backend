import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type FoodAnalysisDocument = FoodAnalysis & Document;

@Schema()
export class FoodAnalysis {
    @Prop({ type: String, required: true })
    _id: string;
    @Prop({ type: [String], ref: 'User', required: true })
    user: string;

    @Prop({ type: [String], ref: 'Food', required: true })
    food: string;

    @Prop()
    date: Date;

    @Prop({ required: true })
    portion_size: number;
}

export const FoodAnalysisSchema = SchemaFactory.createForClass(FoodAnalysis);
