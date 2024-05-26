import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { RoleModule } from './role/role.module';
import { IdService } from 'src/auth/id/id_components';
import { FoodModule } from './food/food.module';
import { FoodAnalysisModule } from './food_analiz/food_analysis.module';
import { ExerciseModule } from './egzersiz/exercise.module';
import { ExerciseAnalysisModule } from './egzersiz_analiz/egzersiz_analiz.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Fitness'),
    
    AuthModule,
    UsersModule,
    FoodModule,
    RoleModule,
    FoodAnalysisModule,
    ExerciseAnalysisModule,
    ExerciseModule
  ],
  controllers: [ AppController],
  providers: [AppService],
})
export class AppModule {}