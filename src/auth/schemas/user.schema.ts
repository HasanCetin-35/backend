import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from 'src/role/enums/role.enum';

@Schema()
export class User extends Document {
    @Prop({ type: String, required: true })
    _id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: [String], ref: 'Food', default: [] })
    selectedFood: string[];

    @Prop({ type: [String], ref: 'Exercise', default: [] })
    selectedExercise: string[];

    @Prop()
    roles: Role[];

    @Prop()
    height: number;

    @Prop()
    weight: number;

    @Prop()
    target: string;
    @Prop()
    gender: string;
    @Prop()
    age: number;

    @Prop()
    targetFood: string[];
    @Prop()
    targetExercises: string[];

}

export const UserSchema = SchemaFactory.createForClass(User);
