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
  async getAllFoods(): Promise<FoodTargetDto[]> {
    const foods = await this.foodModel.find().exec();
    return foods.map(food => this.convertToDto(food));
  }
  async createFood(createFoodDto: FoodTargetDto): Promise<FoodTarget> {
    const { _id, ...rest } = createFoodDto;
    const createdFood = await this.foodModel.create({
      _id: this.idService.generateId(),
      ...rest,
    });
    return createdFood;
  }
  async createFoods(createFoodDtos: FoodTargetDto[]): Promise<FoodTarget[]> {
    const createdFoods: FoodTarget[] = [];

    for (const createFoodDto of createFoodDtos) {
      const { _id, ...rest } = createFoodDto;
      const createdFood = await this.foodModel.create({
        _id: this.idService.generateId(),
        ...rest,
      });
      createdFoods.push(createdFood);
    }

    return createdFoods;
  }
  async findById(foodId: string): Promise<FoodTarget | null> {
    return this.foodModel.findById(foodId).exec();
  }
  async findByFoodName(name: string): Promise<FoodTarget | null> {
    return this.foodModel.findOne({ food_name: name }).exec();
  }

  private convertToDto(food: FoodTarget): FoodTargetDto {
    const { _id, food_name, food_calorie, protein, carbohydrate, sugar, fat, category } = food;
    return { _id, food_name, food_calorie, protein, carbohydrate, sugar, fat, category };
  }
}
