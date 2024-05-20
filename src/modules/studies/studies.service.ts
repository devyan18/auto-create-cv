import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { Model } from 'mongoose';
import { Study } from './schemas/study.schema';

@Injectable()
export class StudiesService {
  constructor(
    @InjectModel(Study.name) private readonly studyModel: Model<Study>,
  ) {}

  async create({ data, userId }: { data: CreateStudyDto; userId: string }) {
    const newStudy = new this.studyModel({
      ...data,
      creator: userId,
    });

    if (!newStudy) throw new BadRequestException('Failed to create study');

    return newStudy.save();
  }

  async findAll({ userId }: { userId: string }) {
    const allStudies = await this.studyModel.find({ creator: userId });

    return allStudies;
  }

  async findOne({ studieId, userId }: { studieId: string; userId: string }) {
    const study = await this.studyModel.findOne({
      studyId: studieId,
      creator: userId,
    });

    if (!study) throw new NotFoundException('Study not found');

    return study;
  }

  async update({
    studieId,
    data,
    userId,
  }: {
    studieId: string;
    data: UpdateStudyDto;
    userId: string;
  }) {
    await this.findOne({ studieId, userId });

    const updatedStudy = await this.studyModel.findByIdAndUpdate(
      { _id: studieId },
      data,
      { new: true },
    );

    if (!updatedStudy) throw new BadRequestException('Failed to update study');

    return updatedStudy;
  }

  async remove({ studieId, userId }: { studieId: string; userId: string }) {
    await this.findOne({ studieId, userId });

    const deletedStudy = await this.studyModel.findOneAndDelete({
      _id: studieId,
      creator: userId,
    });

    if (!deletedStudy) throw new BadRequestException('Failed to delete study');

    return deletedStudy;
  }
}
