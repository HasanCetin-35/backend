// food.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Food extends Document {
  @Prop({ type: String, required: true })
  _id: string;
  @Prop()
  food_name: string;

  @Prop()
  food_calorie: number;

  @Prop()
  protein: number;

  @Prop()
  carbohydrate: number;

  @Prop()
  sugar: number;

  @Prop()
  fat: number;

  @Prop()
  category: string;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
