import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { use } from 'passport';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    async register(dto: AuthDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                username: dto.username
            }
        });

        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        const user = await this.prisma.user.create({
            data: {
                username: dto.username,
                password: await hash(dto.password)
            }
        });

        const tokens = await this.issueTokens(user.username);

        return {
            username: user.username,
            ...tokens
        }
    }

    async login(dto: AuthDto) {
        const user = await this.validateUser(dto.username, dto.password);
        const tokens = await this.issueTokens(user.username);

        return {
            username: user.username,
            ...tokens
        }
    }

    async getNewTokens(refreshToken: string) {
        try {
            const { username } = await this.jwt.verifyAsync(refreshToken);

            if (!username) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const user = await this.prisma.user.findFirst({
                where: {
                    username
                }
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            const tokens = await this.issueTokens(username);

            return {
                username,
                ...tokens
            }
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    private async validateUser(username: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                username
            }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isPasswordValid = await verify(user.password, password);
        if (!isPasswordValid) {
            throw new NotFoundException('Wrong password');
        }

        return user;
    }

    private async issueTokens(username: string) {
        const payload = { username };

        const accessToken = this.jwt.sign(payload, {
            expiresIn: this.config.get('JWT_ACCESS_EXPIRATION_TIME')
        });

        const refreshToken = this.jwt.sign(payload, {
            expiresIn: this.config.get('JWT_REFRESH_EXPIRATION_TIME')
        });

        return { accessToken, refreshToken };
    }
}
