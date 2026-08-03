import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DelayInterceptor } from "./interceptors/delay.interceptor";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalInterceptors(new DelayInterceptor(1000));
    app.enableCors();

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
