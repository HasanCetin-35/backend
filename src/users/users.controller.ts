import {
  Controller,
  Get,
  Req,
  Post,
  Patch,
  Param,
  Body,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current';
//import { JwtAuthGuard } from './jwt-auth.guard'; // Kullanıcı kimlik doğrulaması için JWT tabanlı guard
import { UserService } from './users.service';
import { User } from 'src/auth/schemas/user.schema';
//Kullanıcı besin seçip veritabanına ekleyebilcek
//Bu sahip olduğu besinleri görüntüleme işlemi yapabilcek
//Analiz kısmına geldiği zaman kullandığı besinlerin Toplam değerlerini görüntüleyebilcek
//YAPILACAKLAR: Günlük olarak bu dizi sıfırlanmalı
//haftalık bir dizi oluşturulup oraya kayıt edilmeli gün sonunda
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get('/foods') // Kullanıcının sahip olduğu yiyecekleri getirmek için GET isteği
  async getUserFoods(@CurrentUser() userId: string): Promise<any> {
    return await this.userService.getUserFoods(userId);
  }
  @Post('/select-food') // Kullanıcının yiyecek seçtiği POST isteği
  async selectFood(@CurrentUser() userId: string, @Body() body: { foodId: string }): Promise<any> {
    const { foodId } = body;
    try {
      await this.userService.selectFood(userId, foodId);
      return { message: 'Yiyecek başarıyla seçildi.' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new NotFoundException('Bir hata oluştu');
    }
  }










  @Post('/users')
  async createUser(@Body() createUserDto: User): Promise<any> {
    return await this.userService.createUser(createUserDto);
  }
  //@UseGuards(JwtAuthGuard) 
  @Get()
  //bu kısım oturum açan kullanıcının bilgilerini getirmek içindir.
  async getUser(@Req() request) {
    const userId = request.user;
    return this.userService.getUsers();
  }
  @Patch(':id/update-field')
  async updataField(@Param('id') userId: string,
    @Body() body: { field: 'name' | 'password' | 'email', value: string }) {
    const { field, value } = body
    if (field !== 'name' && field !== 'password' && field !== 'email') {
      throw new BadRequestException('Geçersiz alan');
    }
    return this.userService.updateUserField(userId, field, value)
  }
}
