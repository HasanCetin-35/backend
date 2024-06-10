// food.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodTarget } from './schema/foodtarget.schema'; 
import { FoodTargetDto } from './dto/foodtarget.dto'; 
import { IdService } from 'src/auth/id/id_components';
@Injectable()
export class FoodTargetService {
  constructor(@InjectModel(FoodTarget.name) private readonly foodModel: Model<FoodTarget>, private idService: IdService) { }
  
}
