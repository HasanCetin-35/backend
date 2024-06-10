import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseTargetService } from './egzersiztarget.service'; 

import { ExerciseTarget,ExerciseTargetSchema } from './schema/egzersiztarget.schema'; 
import { IdService } from 'src/auth/id/id_components';

@Module({
  imports: [MongooseModule.forFeature([{ name: ExerciseTarget.name, schema: ExerciseTargetSchema }])],
  
  providers: [ExerciseTargetService,IdService],
})
export class ExerciseTargetModule {}
