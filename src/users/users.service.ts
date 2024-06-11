import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { IdService } from '../auth/id/id_components';
import * as bcrypt from 'bcryptjs';
import { Food } from 'src/food/schema/food.schema';
import { FoodTarget } from 'src/foodtarget/schema/foodtarget.schema'; 
import { Exercise } from 'src/egzersiz/schema/exercise.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) 
    private  userModel: Model<User>, 
    private  idService: IdService,
    @InjectModel(Exercise.name) private  exerciseModel: Model<Exercise>,
    @InjectModel(Food.name) private  foodModel: Model<Food>,@InjectModel(FoodTarget.name) private readonly foodTargetModel: Model<FoodTarget>,
  
  ) { }

    // Kullanıcıyı ID'ye göre bulma kısmı 
    //.exec() kısmı sorguları Promise olarak döndürür.
    //eğer kullanıcı yok ise 'null' değeri döndürmektedir.
     
    async findById(userId: string): Promise<User> {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('Kullanıcı bulunamadı');
      }
      return user;
    }
    async getUserFoods(userId: string): Promise<any> {
      const user = await this.userModel.findById(userId).populate('selectedFood');
      if (!user) {
        throw new NotFoundException('Kullanıcı bulunamadı');
      }
      return user.selectedFood;
    }
    async getTargetFood(userId: string): Promise<any> {
      const user = await this.userModel.findById(userId).populate('targetFood');
      if (!user) {
        throw new NotFoundException('Kullanıcı bulunamadı');
      }
      return user.targetFood;
    }
    async getTargetExercise(userId: string): Promise<any> {
      const user = await this.userModel.findById(userId).populate('targetExercises');
      if (!user) {
        throw new NotFoundException('Kullanıcı bulunamadı');
      }
      return user.targetExercises;
    }

    
    async getUserExercise(userId: string): Promise<any> {
      const user = await this.userModel.findById(userId).populate('selectedExercise');
      if (!user) {
        throw new NotFoundException('Kullanıcı bulunamadı');
      }
      
      return user.selectedExercise;
    }

    async selectFood(userId: string, foodId: string): Promise<void> {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('Kullanıcı bulunamadı');
      }
  
      // Seçilen yiyeceği doğrudan selectedFood dizisine ekle
      user.selectedFood.push(foodId);
      await user.save();
    }

    async selectExercise(userId: string, exerciseId: string): Promise<void> {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('Kullanıcı bulunamadı');
      }
  
      // Seçilen egzersizi doğrudan selectedExercises dizisine ekle
      user.selectedExercise.push(exerciseId);
      await user.save();
    }

    async targetFood(userId: string, foodname: string): Promise<any> {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('Kullanıcı bulunamadı');
      }
  
      // Yiyecek bilgisini veritabanından al
      const food = await this.foodModel.findOne({ food_name: foodname });
      if (!food) {
        throw new NotFoundException('Yiyecek bulunamadı');
      }
      if (user.targetFood.length >= 16) {
        throw new BadRequestException('Hedeflenen Besinlerin maksimum sayısı aşıldı');
      }
      user.targetFood.push(food._id);
      await user.save();
    }
    async targetExercise(userId:string,exercisename:string):Promise<any>{
      const user =await this.userModel.findById(userId)
      if (!user) {
        throw new NotFoundException('Kullanıcı bulunamadı');
      }
      const exercise = await this.exerciseModel.findOne({egzersiz_adi:exercisename})
      if (!exercise) {
        throw new NotFoundException('Egzersiz bulunamadı');
      }
      if (user.targetExercises.length >= 3) {
        throw new BadRequestException('Hedeflenen egzersizlerin maksimum sayısı aşıldı');
      }
      user.targetExercises.push(exercise._id)
      await user.save()  
    }





    async createUser(createUserDto: User): Promise<any> {
        const createdUser = new this.userModel({
          ...createUserDto,
          _id: this.idService.generateId(),
        });
        await createdUser.save();
    
        // Return a user DTO without password for security
        return { id: createdUser._id, name: createdUser.name, email: createdUser.email,password:createdUser.password };
      }
    async find(): Promise<User[]> {
        return this.userModel.find().exec();
      }
      
    async getUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }
    async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
        // Find the user by ID
        const user = await this.userModel.findById(userId);
        if (!user) {
          throw new NotFoundException('User not found');
        }
      
        // Update the user fields
        Object.assign(user, updateData);
      
        // Check if the password needs to be hashed
        if (updateData.password) {
          user.password = await bcrypt.hash(updateData.password, 10);
        }
      
        // Save the updated user
        await user.save();
      
        return user;
      }
    async updateUserField(userId: string, field: 'name' | 'password' | 'email', value: string): Promise<User> {
        // Kullanıcıyı bul
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('Kullanıcı bulunamadı');
        }
        // Alanlar ve karşılık gelen özelliklerin bir dizisi
        const fields = {
            'username': 'username',
            'password': 'password',
            'email': 'email'
        };
        // Belirtilen alanın doğru olup olmadığını kontrol et
        let hashedValue: string | undefined;
        if (field === 'password') {
            hashedValue = await bcrypt.hash(value, 10);
        }
    
        // Alanları güncelle
        switch (field) {
            case 'name':
                user.name = value;
                break;
            case 'password':
                user.password = hashedValue || user.password; // Hashlenmiş şifreyi kullan veya mevcut şifreyi koru
                break;
            case 'email':
                user.email = value;
                break;
            default:
                throw new BadRequestException('Geçersiz alan');
        }
    
        // Kullanıcıyı kaydet
        await user.save();
    
        return user;
    }
    
}