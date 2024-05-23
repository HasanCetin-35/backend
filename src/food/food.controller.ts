// food.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodDto } from './dto/food.dto';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  async getAllFoods(): Promise<FoodDto[]> {
    return this.foodService.getAllFoods();
  }

  @Post()
  async createFood(@Body() foodDto: FoodDto): Promise<FoodDto> {
    return this.foodService.createFood(foodDto);
  }
  @Post('/bulk')//toplu besin kayıt işlemi
  async createBulkFoods(@Body() foodDtos: FoodDto[]): Promise<FoodDto[]> {
    return this.foodService.createFoods(foodDtos);
  }
}
