// request-counter.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestCounterService } from './request-counter.service';

@Injectable()
export class RequestCounter implements NestMiddleware {
  constructor(private readonly requestCounterService: RequestCounterService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.requestCounterService.increment();
    next();
  }
}
