import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    HttpStatus,
    CallHandler,
    HttpException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseHandlerInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data) => {
                const response = context.switchToHttp().getResponse();
                const statusCode = response.statusCode || HttpStatus.OK;
                return {
                    status: statusCode,
                    message: 'Success',
                    data: data
                };
            }),
            catchError((error) => {
                if (error instanceof HttpException) {
                    const statusCode = error?.getStatus()

                    const customError = {
                        statusCode: statusCode,
                        message: error.message,
                        error: "error"
                    };

                    return throwError(() => new HttpException(customError, statusCode));
                } else {
                    return throwError(() => new InternalServerErrorException(error.message));
                }
            })
        );
    }
}
