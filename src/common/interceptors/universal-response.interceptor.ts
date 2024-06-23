import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { UniversalResponseDTO } from '../dtos/universal-response.dto';

@Injectable()
export class UniversalResponseInterceptor<T> implements NestInterceptor<T, UniversalResponseDTO<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<UniversalResponseDTO<T>> {
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data: T) => {
        const response: UniversalResponseDTO<T> = {
          status: 'Success',
          error: null,
          data,
        };

        if (data instanceof UniversalResponseDTO) {
          return data as UniversalResponseDTO<T>;
        }

        return response as UniversalResponseDTO<T>;
      }),
      catchError((err) => {
        res.status(err.status ?? 503);
        return of({
          status: 'Error' as const,
          data: null as T,
          error: err,
        });
      }),
    );
  }
}
