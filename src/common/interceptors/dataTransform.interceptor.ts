import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from '../../user/models/user.model';

export class CustomInterceptors implements NestInterceptor {
 intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
   console.log('Before...');
return handler.handle().pipe(
    map((data) => {
      console.log('After....');
      const updatedItem = {
        ...data,
        userEmail: data.email,
      };
      delete updatedItem.email;
      return updatedItem;
    }),
  );
 }
}