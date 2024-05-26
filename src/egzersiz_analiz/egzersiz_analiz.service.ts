import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseService } from 'src/egzersiz/exercise.service';
import { ExerciseAnalysis, ExerciseAnalysisDocument } from './schema/egzersiz_analiz.schema';
import { CreateExerciseAnalysisDto } from './dto/egzersiz_analiz.dto';
import { UserService } from 'src/users/users.service';

@Injectable()
export class ExerciseAnalysisService {
  constructor(
    @InjectModel(ExerciseAnalysis.name) private readonly exerciseAnalysisModel: Model<ExerciseAnalysisDocument>,
    private readonly exerciseService: ExerciseService,
    private readonly userService: UserService,
  ) { }

  async create(createExerciseAnalysisDto: CreateExerciseAnalysisDto): Promise<ExerciseAnalysis> {
    const createdExerciseAnalysis = new this.exerciseAnalysisModel(createExerciseAnalysisDto);
    return createdExerciseAnalysis.save();
  }

  async findAll(): Promise<ExerciseAnalysis[]> {
    return this.exerciseAnalysisModel.find().populate('user').populate('exercise').exec();
  }

  async findByUser(userId: string): Promise<ExerciseAnalysis[]> {
    return this.exerciseAnalysisModel.find({ user: userId }).populate('exercise').exec();
  }

  async calculateUserExercise(userId: string): Promise<{ totalKalori: number }> {
    // Kullanıcının bilgilerini al
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }

    let totalKalori = 0;

    // Seçili egzersizlerin kimliklerini al
    const selectedExercises = user.selectedExercise;

    // Her bir seçili egzersiz için toplam süreyi hesapla
    for (const exerciseId of selectedExercises) {
      const exercise = await this.exerciseService.findById(exerciseId);
      if (!exercise) {
        // Egzersiz bulunamadı hatası
        throw new NotFoundException('Egzersiz bulunamadı');
      }
      // Egzersizin süresini topla
      totalKalori += exercise.ortalama_yakilan_kalori;
    }

    return { totalKalori };
  }
}
