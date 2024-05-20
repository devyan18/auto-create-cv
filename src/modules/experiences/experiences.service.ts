import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Experience } from './schemas/experience.schema';
import { Model } from 'mongoose';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectModel(Experience.name)
    private readonly experienceModel: Model<Experience>,
  ) {}

  async create({
    data,
    userId,
  }: {
    data: CreateExperienceDto;
    userId: string;
  }) {
    const newExperience = new this.experienceModel({
      ...data,
      creator: userId,
    });

    if (!newExperience) {
      throw new BadRequestException('Invalid data');
    }

    if (!newExperience.endDate) {
      newExperience.endDate = null;
    }

    return newExperience.save();
  }

  async findAll({ userId }: { userId: string }) {
    const allExperiences = await this.experienceModel
      .find({ creator: userId })
      .populate('creator', {
        _id: 0,
        password: 0,
      });

    if (!allExperiences) {
      throw new BadRequestException('No experiences found');
    }

    return allExperiences;
  }

  async findOne({
    experienceId,
    userId,
  }: {
    experienceId: string;
    userId: string;
  }) {
    const findedExperience = await this.experienceModel
      .findOne({
        experienceId,
        creator: userId,
      })
      .populate('creator', {
        _id: 0,
        password: 0,
      });

    if (!findedExperience) {
      throw new NotFoundException('Experience not found');
    }

    return findedExperience;
  }

  async update({
    experienceId,
    data,
    userId,
  }: {
    experienceId: string;
    data: UpdateExperienceDto;
    userId: string;
  }) {
    await this.findOne({ experienceId, userId });

    const updatedExperience = await this.experienceModel.findOneAndUpdate(
      { experienceId, creator: userId },
      data,
      { new: true },
    );

    if (!updatedExperience) {
      throw new BadRequestException('Invalid data');
    }

    return updatedExperience;
  }

  async remove({
    experienceId,
    userId,
  }: {
    experienceId: string;
    userId: string;
  }) {
    await this.findOne({ experienceId, userId });

    const deletedExperience = await this.experienceModel.findOneAndDelete({
      experienceId,
      creator: userId,
    });

    return deletedExperience;
  }
}
