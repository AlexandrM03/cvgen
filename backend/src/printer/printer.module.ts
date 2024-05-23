import { Module } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { S3Service } from 'src/s3/s3.service';
import { S3Module } from 'src/s3/s3.module';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [S3Module],
    exports: [PrinterService],
    providers: [PrinterService, S3Service, ConfigService]
})
export class PrinterModule { }
