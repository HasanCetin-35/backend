import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { RoleModule } from './role/role.module';
import { IdService } from 'src/auth/id/id_components';
import { FoodModule } from './food/food.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Fitness'),
    
    AuthModule,
    UsersModule,
    FoodModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}