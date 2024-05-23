import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { SharedController } from './shared.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [SharedController],
    providers: [SharedService, PrismaService],
})
export class SharedModule { }
