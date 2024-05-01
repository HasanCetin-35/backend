// food.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { Food, FoodSchema } from './schema/food.schema';
import { IdService } from 'src/auth/id/id_components';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }])
  ],
  controllers: [FoodController],
  providers: [FoodService,IdService],
})
export class FoodModule {}
