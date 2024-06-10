// food.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FoodTargetService } from './foodtarget.services'; 
import { FoodTargetDto } from './dto/foodtarget.dto'; 

@Controller('targetfood')
export class FoodTargetController {
  constructor(private readonly foodService: FoodTargetService) {}

}
