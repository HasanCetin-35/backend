import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExerciseDocument = Exercise & Document;

@Schema()
export class Exercise {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ type: String, required: true })
  egzersiz_adi: string;

  @Prop({ type: String, required: true })
  egzersiz_turu: string;

  @Prop({ type: Number, required: true })
  ortalama_yakilan_kalori: number;

  @Prop({ type: String, required: true })
  ortalama_sure: string;

  @Prop({ type: String, required: true })
  zorluk_seviyesi: string;

  @Prop({ type: [String], required: true })
  gereken_ekipmanlar: string[];

  @Prop({ type: [String], required: true })
  hedeflenen_bolgeler: string[];
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
