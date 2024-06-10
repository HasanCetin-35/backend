// food.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FoodTargetService } from './foodtarget.services'; 
import { FoodTargetDto } from './dto/foodtarget.dto'; 

@Controller('targetfood')
export class FoodTargetController {
  constructor(private readonly foodService: FoodTargetService) {}

  @Get()
  async getAllFoods(): Promise<FoodTargetDto[]> {
    return this.foodService.getAllFoods();
  }

  @Post()
  async createFood(@Body() foodDto: FoodTargetDto): Promise<FoodTargetDto> {
    return this.foodService.createFood(foodDto);
  }
  @Post('/bulk')//toplu besin kayıt işlemi
  async createBulkFoods(@Body() foodDtos: FoodTargetDto[]): Promise<FoodTargetDto[]> {
    return this.foodService.createFoods(foodDtos);
  }
  @Get(":name")
  async getNameFood(@Param("name") name:string):Promise<FoodTargetDto>{
    return this.foodService.findByFoodName(name)
  }
}
