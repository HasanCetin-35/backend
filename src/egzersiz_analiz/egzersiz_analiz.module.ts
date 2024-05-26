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
@Module({
  imports: [
    MongooseModule.forFeature([{ name: ExerciseAnalysis.name, schema: ExerciseAnalysisSchema },{ name: Exercise.name, schema: ExerciseSchema }, // FoodSchema eklendi
    {name:User.name,schema:UserSchema}])
  ],
  controllers: [ExerciseAnalysisController],
  providers: [ExerciseAnalysisService, ExerciseService, UserService,IdService],
})
export class ExerciseAnalysisModule {}