// food.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodTargetController } from './foodtarget.controller'; 
import { FoodTargetService } from './foodtarget.services';
import { FoodTarget,FoodTargetSchema } from './schema/foodtarget.schema';
import { IdService } from 'src/auth/id/id_components';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FoodTarget.name, schema: FoodTargetSchema }])
  ],
  controllers: [FoodTargetController],
  providers: [FoodTargetService,IdService],
})
export class FoodTargetModule {}
