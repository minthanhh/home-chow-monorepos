import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ResponseDto } from '../dtos';
export declare class SerializerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): import("rxjs").Observable<ResponseDto<any>>;
}
