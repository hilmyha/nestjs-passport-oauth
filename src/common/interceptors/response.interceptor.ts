import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

export interface ResponseFormat<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseFormat<T>> {
    return next.handle().pipe(
      map((data: T) => ({
        statusCode: context.switchToHttp().getResponse<Response>().statusCode,
        data,
        message: 'Data retrieved successfully',
        success: true,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
