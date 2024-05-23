import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { CreateExerciseDto } from './dto/exercise.dto';
import { Exercise } from './schema/exercise.schema';
import { ExerciseService } from './exercise.service';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post('/bulk')//toplu egzersiz kayıt için
  async createExercises(@Body() createExerciseDtos: CreateExerciseDto[]): Promise<Exercise[]> {
    return this.exerciseService.createExercises(createExerciseDtos);
  }

  @Post()//tek bir tane egzersiz kayıt etmek için
  async create(@Body() createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    return this.exerciseService.create(createExerciseDto);
  }

  @Get()//tüm egzersizleri görüntülemek için
  async findAll(): Promise<Exercise[]> {
    return this.exerciseService.findAll();
  }

  @Get(':id')//seçtiğimiz egzersizin detaylı bilgileri için
  async findById(@Param('id') id: string): Promise<Exercise> {
    return this.exerciseService.findById(id);
  }
}
