import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFoodAnalysisDto } from './dto/food_analysis.dto';
import { FoodAnalysis, FoodAnalysisDocument } from './schema/food_analysis.schema';
import { FoodService } from 'src/food/food.service';
import { UserService } from 'src/users/users.service';

@Injectable()
export class FoodAnalysisService {
  constructor(
    @InjectModel(FoodAnalysis.name) private readonly foodAnalysisModel: Model<FoodAnalysisDocument>,
    private readonly foodService: FoodService,
    private readonly userService: UserService
  ) { }

  async create(createFoodAnalysisDto: CreateFoodAnalysisDto): Promise<FoodAnalysis> {
    const createdFoodAnalysis = new this.foodAnalysisModel(createFoodAnalysisDto);
    return createdFoodAnalysis.save();
  }

  async findAll(): Promise<FoodAnalysis[]> {
    return this.foodAnalysisModel.find().populate('user').populate('food').exec();
  }

  async findByUser(userId: string): Promise<FoodAnalysis[]> {
    return this.foodAnalysisModel.find({ user: userId }).populate('food').exec();
  }
//food analiz kısmı selectedFood dizisi içerisinde ki ürünleri alsın
async calculateUserNutrition(userId: string): Promise<{ protein: number, carbohydrate: number, fat: number }> {
  // Kullanıcının bilgilerini al
  const user = await this.userService.findById(userId);
  if (!user) {
    throw new NotFoundException('Kullanıcı bulunamadı');
  }

  let totalProtein = 0;
  let totalCarbohydrate = 0;
  let totalFat = 0;

  // Seçili yiyeceklerin kimliklerini al
  const selectedFoods = user.selectedFood;
  console.log(selectedFoods);
  // Her bir seçili yiyecek için besin analizi yap
  for (const foodId of selectedFoods) {
    const food = await this.foodService.findById(foodId);
    console.log(food);
    if (!food) {
      // Yiyecek bulunamadı hatası
      throw new NotFoundException('Yiyecek bulunamadı');
    }
    // Yiyeceğin besin değerlerini topla
    totalProtein += food.protein;
    totalCarbohydrate += food.carbohydrate;
    totalFat += food.fat;
  }

  return { protein: totalProtein, carbohydrate: totalCarbohydrate, fat: totalFat };
}
}
