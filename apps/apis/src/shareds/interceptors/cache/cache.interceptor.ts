import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    protected allowedMethods = ['GET']

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle()
    }
}
