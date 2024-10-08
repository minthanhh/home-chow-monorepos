import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class CacheInterceptor implements NestInterceptor {
    protected allowedMethods: string[];
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
