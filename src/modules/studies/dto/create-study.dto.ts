import { IsISO8601, IsOptional, IsString } from 'class-validator';
import { Study } from '../entities/study.entity';

export class CreateStudyDto implements Partial<Study> {
  @IsString()
  title: string;

  @IsString()
  level: string;

  @IsString()
  status: string;

  @IsISO8601()
  startDate: string;

  @IsOptional()
  @IsISO8601()
  endDate?: string;
}
