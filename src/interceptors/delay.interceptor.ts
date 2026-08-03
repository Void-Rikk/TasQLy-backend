import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { delay, Observable } from "rxjs";


@Injectable()
export class DelayInterceptor implements NestInterceptor {

    private readonly delayTime: number;

    constructor(delay?: number) {
        this.delayTime = delay || 500;
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(delay(this.delayTime));
    }
}