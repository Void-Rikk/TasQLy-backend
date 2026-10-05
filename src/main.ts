import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DelayInterceptor } from "./interceptors/delay.interceptor";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { isDev } from "./utils/is-dev.util";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
    }));
    if (isDev()) {
        app.useGlobalInterceptors(new DelayInterceptor(1000));
    }
    app.enableCors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
