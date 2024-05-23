import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { PrismaService } from 'src/prisma.service';
import { PrinterService } from 'src/printer/printer.service';
import { S3Service } from 'src/s3/s3.service';
import { ConfigService } from '@nestjs/config';

@Module({
    controllers: [CvController],
    providers: [CvService, PrismaService, PrinterService, S3Service, ConfigService],
})
export class CvModule { }
