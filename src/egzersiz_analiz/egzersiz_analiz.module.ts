import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from 'src/users/users.service';
import { ExerciseAnalysis, ExerciseAnalysisSchema } from './schema/egzersiz_analiz.schema';
import { ExerciseAnalysisController } from './egzersiz_analiz.controller';
import { ExerciseAnalysisService } from './egzersiz_analiz.service';
import { ExerciseService } from 'src/egzersiz/exercise.service';
import { Exercise, ExerciseSchema } from 'src/egzersiz/schema/exercise.schema';
import { User, UserSchema } from 'src/auth/schemas/user.schema';
import { IdService } from 'src/auth/id/id_components';
import { FoodSchema } from 'src/food/schema/food.schema';
import { FoodTarget,FoodTargetSchema } from 'src/foodtarget/schema/foodtarget.schema'; 
@Module({
  imports: [
    MongooseModule.forFeature([{ name: ExerciseAnalysis.name, schema: ExerciseAnalysisSchema },{ name: Exercise.name, schema: ExerciseSchema },
    { name: FoodTarget.name, schema: FoodTargetSchema }, // FoodSchema eklendi
    {name:User.name,schema:UserSchema}]),
    MongooseModule.forFeature([{ name: 'Food', schema: FoodSchema }])
  ],
  controllers: [ExerciseAnalysisController],
  providers: [ExerciseAnalysisService, ExerciseService, UserService,IdService],
})
export class ExerciseAnalysisModule {}
