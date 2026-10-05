import type { JwtModuleOptions } from "@nestjs/jwt";

export async function getJwtConfig(): Promise<JwtModuleOptions> {

    return {
        secret: process.env.JWT_SECRET || "MegaSecret",
        signOptions: {
            algorithm: "HS256"
        },
        verifyOptions: {
            algorithms: ['HS256'],
            ignoreExpiration: false,
        }
    };
}