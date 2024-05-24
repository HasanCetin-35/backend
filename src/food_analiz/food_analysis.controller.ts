import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FoodAnalysisService } from './food_analysis.service';
import { CreateFoodAnalysisDto } from './dto/food_analysis.dto';
import { FoodAnalysis } from './schema/food_analysis.schema';
import { CurrentUser } from 'src/auth/decorators/current';
import { IdService } from 'src/auth/id/id_components';
@Controller('food-analysis')
export class FoodAnalysisController {
  constructor(private readonly foodAnalysisService: FoodAnalysisService,
    private idService: IdService,
  ) {} 
  @Post()
  async create(@CurrentUser() userId: string, @Body() body: { foodId: string, portion: number }): Promise<FoodAnalysis> {
    const { foodId, portion } = body;
    const createFoodAnalysisDto: CreateFoodAnalysisDto = {
        _id: this.idService.generateId(),
        user: userId,
        food: foodId,
        portion_size: portion,
        date: undefined
    };  
    return this.foodAnalysisService.create(createFoodAnalysisDto);
  }
  @Get()
  async findAll(): Promise<FoodAnalysis[]> {
    return this.foodAnalysisService.findAll();
  }

  @Get('user')
  async findByUser(@CurrentUser() userId: string): Promise<FoodAnalysis[]> {
    return this.foodAnalysisService.findByUser(userId);
  }
  @Get('user/nutrition')
  async getUserNutrition(@CurrentUser() userId: string): Promise<{ protein: number, carbohydrate: number, fat: number }> {
    return this.foodAnalysisService.calculateUserNutrition(userId);
  }
  //kullanıcı toplam aldığı kalori değerlerini bir arayüzde görebilsin(Hizmetlerim kısmı)
  //Admin paneli giriş yapınca tüm kullanıların bilgilerini kayıtlarını görebildiği bir arayüz Olsun
}
