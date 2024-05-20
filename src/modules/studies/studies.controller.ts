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
import { StudiesService } from './studies.service';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Post()
  create(@Request() req: any, @Body() createStudyDto: CreateStudyDto) {
    const user = req.user;

    return this.studiesService.create({
      data: createStudyDto,
      userId: user.userId,
    });
  }

  @Get()
  findAll(@Request() req: any) {
    const user = req.user;

    return this.studiesService.findAll({
      userId: user.userId,
    });
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    const user = req.user;

    return this.studiesService.findOne({
      studieId: id,
      userId: user.userId,
    });
  }

  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateStudyDto: UpdateStudyDto,
  ) {
    const user = req.user;

    return this.studiesService.update({
      studieId: id,
      data: updateStudyDto,
      userId: user.userId,
    });
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    const user = req.user;

    return this.studiesService.remove({
      studieId: id,
      userId: user.userId,
    });
  }
}
