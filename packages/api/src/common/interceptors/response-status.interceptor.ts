import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../types/shared.types';

@Injectable()
/**
 * Interceptor that sets the HTTP response status code based on the response object returned from the handler.
 */
export class ResponseStatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: Response<any>) => {
        const httpResponse = context.switchToHttp().getResponse();
        httpResponse.status(response.statusCode);
        return response;
      }),
    );
  }
}
