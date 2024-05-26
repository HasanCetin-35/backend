import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './users.service';
import { IdService } from '../auth/id/id_components';
import { ExerciseService } from 'src/egzersiz/exercise.service';
import { User, UserSchema } from 'src/auth/schemas/user.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, IdService],
})
export class UsersModule { }
