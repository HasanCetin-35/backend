import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { CreateExerciseAnalysisDto } from './dto/egzersiz_analiz.dto';
import { ExerciseAnalysis } from './schema/egzersiz_analiz.schema';
import { ExerciseAnalysisService } from './egzersiz_analiz.service';
import { CurrentUser } from 'src/auth/decorators/current';

@Controller('exerciseanalysis')
export class ExerciseAnalysisController {
  constructor(private readonly exerciseAnalysisService: ExerciseAnalysisService) {}

  @Post()
  async create(@Body() createExerciseAnalysisDto: CreateExerciseAnalysisDto): Promise<ExerciseAnalysis> {
    return this.exerciseAnalysisService.create(createExerciseAnalysisDto);
  }

  @Get()
  async findAll(): Promise<ExerciseAnalysis[]> {
    return this.exerciseAnalysisService.findAll();
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<ExerciseAnalysis[]> {
    return this.exerciseAnalysisService.findByUser(userId);
  }

  @Get('/calculate')
  async calculateUserExercise(@CurrentUser() userId: string): Promise<{ totalKalori: number }> {
    return this.exerciseAnalysisService.calculateUserExercise(userId);
  }
}
