import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  create(
    @Body() createExperienceDto: CreateExperienceDto,
    @Request() req: any,
  ) {
    const user = req.user;

    return this.experiencesService.create({
      data: createExperienceDto,
      userId: user.userId,
    });
  }

  @Get()
  findAll(@Request() req: any) {
    const user = req.user;

    return this.experiencesService.findAll({
      userId: user.userId,
    });
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    const user = req.user;

    return this.experiencesService.findOne({
      experienceId: id,
      userId: user.userId,
    });
  }

  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    const user = req.user;

    return this.experiencesService.update({
      experienceId: id,
      data: updateExperienceDto,
      userId: user.userId,
    });
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    const user = req.user;

    return this.experiencesService.remove({
      experienceId: id,
      userId: user.userId,
    });
  }
}
