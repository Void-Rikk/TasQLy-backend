import { Module } from "@nestjs/common";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { getJwtConfig } from "../../config/jwt.config";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";


@Module({
    providers: [AuthResolver, AuthService, JwtStrategy],
    exports: [],
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: getJwtConfig
        })
    ]
})
export class AuthModule {}