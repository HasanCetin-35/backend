import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodAnalysisController } from './food_analysis.controller';
import { FoodAnalysisService } from './food_analysis.service';
import { FoodAnalysis,FoodAnalysisDocument, FoodAnalysisSchema } from './schema/food_analysis.schema';
import { FoodService } from 'src/food/food.service';
import { Food,FoodSchema } from 'src/food/schema/food.schema';
import { IdService } from 'src/auth/id/id_components';
import { UserService } from 'src/users/users.service';
import { User, UserSchema } from 'src/auth/schemas/user.schema';
import { FoodTarget,FoodTargetSchema } from 'src/foodtarget/schema/foodtarget.schema'; 
import { Exercise, ExerciseSchema } from 'src/egzersiz/schema/exercise.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FoodAnalysis.name, schema: FoodAnalysisSchema },
      { name: Food.name, schema: FoodSchema },
      { name: Exercise.name, schema: ExerciseSchema },
      { name: FoodTarget.name, schema: FoodTargetSchema },
       // FoodSchema eklendi
      {name:User.name,schema:UserSchema}
    ]),
  ],
  controllers: [FoodAnalysisController],
  providers: [FoodAnalysisService, FoodService,IdService,UserService], // FoodService eklendi
})
export class FoodAnalysisModule {}
