import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() dto: AuthDto) {
        return await this.authService.register(dto);
    }

    @Post('login')
    async login(@Body() dto: AuthDto) {
        return await this.authService.login(dto);
    }

    @Post('refresh')
    async refresh(@Body('refreshToken') refreshToken: string) {
        return await this.authService.getNewTokens(refreshToken);
    }
}
