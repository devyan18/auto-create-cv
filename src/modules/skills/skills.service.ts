import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './schemas/skill.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private readonly skillModel: Model<Skill>,
  ) {}

  async create(userId: string, createSkillDto: CreateSkillDto) {
    const creates = await this.findAll(userId);

    const isReadyName = creates.find(
      (create) => create.name === createSkillDto.name,
    );

    if (isReadyName) {
      throw new BadRequestException('Skill already exists');
    }

    const data = {
      ...createSkillDto,
      creator: userId,
    };

    const newSkill = new this.skillModel(data);

    if (!newSkill) {
      throw new Error('Error creating skill');
    }

    return newSkill.save();
  }

  async findAll(userId: string) {
    // order from the most recent to the oldest
    return this.skillModel
      .find({ creator: userId })
      .populate('creator', {
        password: 0,
      })
      .sort({ updatedAt: -1 });
  }

  async findOne(id: string, creatorId: string) {
    const skill = await this.skillModel.findOne({
      skillId: id,
      creator: creatorId,
    });

    if (!skill) {
      throw new NotFoundException(`Skill with id ${id} not found`);
    }

    return skill;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto, creatorId: string) {

    await this.findOne(id, creatorId)

    return this.skillModel.findOneAndUpdate(
      { skillId: id, creator: creatorId },
      updateSkillDto,
      {
        new: true,
      },
    );
  }

  async remove(id: string, creatorId: string) {
    return this.skillModel.findOneAndDelete({
      skillId: id,
      creator: creatorId,
    });
  }
}
