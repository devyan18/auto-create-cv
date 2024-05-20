import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';
import { DateValidation } from './dto/dates.validator';
import { MongooseModule } from '@nestjs/mongoose';
import { Experience, ExperienceSchema } from './schemas/experience.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Experience.name, schema: ExperienceSchema },
    ]),
  ],
  controllers: [ExperiencesController],
  providers: [ExperiencesService],
})
export class ExperiencesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DateValidation).forRoutes(
      {
        path: 'experiences',
        method: RequestMethod.POST,
      },
      {
        path: 'experiences/:id',
        method: RequestMethod.PATCH,
      },
    );
  }
}
