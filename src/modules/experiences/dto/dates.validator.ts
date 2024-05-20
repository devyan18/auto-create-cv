import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DateValidation implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const { startDate, endDate } = req.body;

    if (!endDate) {
      return next();
    }

    const dateStartDate = new Date(startDate);
    const dateEndDate = new Date(endDate);

    if (dateStartDate.getTime() >= dateEndDate.getTime()) {
      throw new BadRequestException('End date must be greater than start date');
    }

    next();
  }
}
