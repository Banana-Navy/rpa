// Example usage in a controller
import { Controller, Get } from '@nestjs/common';
import { RequestCounterService } from './request-counter.service';

@Controller('request-counter')
export class RequestCounterController {
  constructor(private readonly requestCounterService: RequestCounterService) {}

  @Get('total-requests')
  getTotalRequests() {
    return this.requestCounterService.getCount();
  }
}
