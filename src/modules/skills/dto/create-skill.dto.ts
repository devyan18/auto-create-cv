import { Skill } from '../entities/skill.entity';
import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateSkillDto implements Partial<Skill> {
  @IsString()
  name: string;

  @IsNumber()
  yearsOfExperience: number;

  @IsUrl()
  logo: string;
}
