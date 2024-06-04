// food.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food } from './schema/food.schema';
import { FoodDto } from './dto/food.dto';
import { IdService } from 'src/auth/id/id_components';
@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private readonly foodModel: Model<Food>, private idService: IdService) { }
  async getAllFoods(): Promise<FoodDto[]> {
    const foods = await this.foodModel.find().exec();
    return foods.map(food => this.convertToDto(food));
  }
  async createFood(createFoodDto: FoodDto): Promise<Food> {
    const { _id, ...rest } = createFoodDto;
    const createdFood = await this.foodModel.create({
      _id: this.idService.generateId(),
      ...rest,
    });
    return createdFood;
  }
  async createFoods(createFoodDtos: FoodDto[]): Promise<Food[]> {
    const createdFoods: Food[] = [];

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
  async findById(foodId: string): Promise<Food | null> {
    return this.foodModel.findById(foodId).exec();
  }
  async findByFoodName(name: string): Promise<Food | null> {
    return this.foodModel.findOne({ food_name: name }).exec();
  }

  private convertToDto(food: Food): FoodDto {
    const { _id, food_name, food_calorie, protein, carbohydrate, sugar, fat, category } = food;
    return { _id, food_name, food_calorie, protein, carbohydrate, sugar, fat, category };
  }
}
