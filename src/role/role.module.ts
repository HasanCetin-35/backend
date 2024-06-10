import { Module } from '@nestjs/common';
//import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { UserService } from '../users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { IdService } from 'src/auth/id/id_components';
import { CompanySchema } from 'src/auth/schemas/providers.schema';
import { FoodSchema } from 'src/food/schema/food.schema';
import { FoodTargetSchema } from 'src/foodtarget/schema/foodtarget.schema'; 

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Fitness'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: 'Food', schema: FoodSchema }]),
    MongooseModule.forFeature([{ name: 'FoodTarget', schema: FoodTargetSchema }])
  ],
  providers: [RoleService, AuthService, UserService, IdService, JwtService],
  exports: [RoleService, IdService, UserService],
})
export class RoleModule {}
