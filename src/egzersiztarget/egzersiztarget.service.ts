import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExerciseTargetDto } from './dto/egzersiztarget.dto'; 
import { ExerciseTarget,ExerciseTargetDocument } from './schema/egzersiztarget.schema'; 
import { IdService } from 'src/auth/id/id_components';
@Injectable()
export class ExerciseTargetService {
  constructor(@InjectModel(ExerciseTarget.name) private readonly exerciseModel: Model<ExerciseTargetDocument>,private idService: IdService) {}

  async createExercises(createExerciseDtos: CreateExerciseTargetDto[]): Promise<ExerciseTarget[]> {
    const createdExercises: ExerciseTarget[] = [];

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


  async create(createExerciseDto: CreateExerciseTargetDto): Promise<ExerciseTarget> {
    const createdExercise = new this.exerciseModel(createExerciseDto);
    return createdExercise.save();
  }

  async findAll(): Promise<ExerciseTarget[]> {
    return this.exerciseModel.find().exec();
  }

  async findById(id: string): Promise<ExerciseTarget> {
    const exercise = await this.exerciseModel.findById(id).exec();
    if (!exercise) {
      throw new NotFoundException('Egzersiz asdabulunamadı');
    }
    return exercise;
  }
  async findByExerciseName(name: string): Promise<ExerciseTarget | null> {
    return this.exerciseModel.findOne({ egzersiz_adi: name }).exec();
  }


}
