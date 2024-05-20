import { IsISO8601, IsOptional, IsString } from 'class-validator';
import { Experience } from '../entities/experience.entity';

export class CreateExperienceDto implements Partial<Experience> {
  @IsString()
  position: string;

  @IsString()
  company: string;

  @IsISO8601()
  startDate: string;

  @IsOptional()
  @IsISO8601()
  endDate?: string;
}
