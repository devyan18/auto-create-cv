import { Controller, Get, HttpCode } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('')
  @HttpCode(200)
  health() {
    const isHealth = this.healthService.health();

    if (isHealth) {
      return { status: 'UP' };
    }

    return { status: 'DOWN' };
  }
}
