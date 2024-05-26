import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExerciseAnalysisDocument = ExerciseAnalysis & Document;

@Schema()
export class ExerciseAnalysis {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ type: String, ref: 'User', required: true })
  user: string;

  @Prop({ type: String, ref: 'Exercise', required: true })
  exercise: string;

  @Prop()
  date: Date;

  @Prop({ required: true })
  duration: number; // Assuming duration in minutes
}

export const ExerciseAnalysisSchema = SchemaFactory.createForClass(ExerciseAnalysis);
