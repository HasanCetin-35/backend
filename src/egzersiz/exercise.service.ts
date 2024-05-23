import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExerciseDto } from './dto/exercise.dto';
import { Exercise,ExerciseDocument } from './schema/exercise.schema';
import { IdService } from 'src/auth/id/id_components';
@Injectable()
export class ExerciseService {
  constructor(@InjectModel(Exercise.name) private readonly exerciseModel: Model<ExerciseDocument>,private idService: IdService) {}

  async createExercises(createExerciseDtos: CreateExerciseDto[]): Promise<Exercise[]> {
    const createdExercises: Exercise[] = [];

    for (const createExerciseDto of createExerciseDtos) {
      const { _id, ...rest } = createExerciseDto;
      const createdExercise = await this.exerciseModel.create({
        _id: this.idService.generateId(),
        ...rest,
      });
      createdExercises.push(createdExercise);
    }

    return createdExercises;
  }


  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const createdExercise = new this.exerciseModel(createExerciseDto);
    return createdExercise.save();
  }

  async findAll(): Promise<Exercise[]> {
    return this.exerciseModel.find().exec();
  }

  async findById(id: string): Promise<Exercise> {
    const exercise = await this.exerciseModel.findById(id).exec();
    if (!exercise) {
      throw new NotFoundException('Egzersiz bulunamadı');
    }
    return exercise;
  }
}
