import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { Exercise,ExerciseDocument, ExerciseSchema } from './schema/exercise.schema';
import { IdService } from 'src/auth/id/id_components';

@Module({
  imports: [MongooseModule.forFeature([{ name: Exercise.name, schema: ExerciseSchema }])],
  controllers: [ExerciseController],
  providers: [ExerciseService,IdService],
})
export class ExerciseModule {}
