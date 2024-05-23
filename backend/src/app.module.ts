import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProjectModule } from './project/project.module';
import { EmployeeModule } from './employee/employee.module';
import { SharedModule } from './shared/shared.module';
import { S3Module } from './s3/s3.module';
import { AuthModule } from './auth/auth.module';
import { PrinterService } from './printer/printer.service';
import { PrinterModule } from './printer/printer.module';
import { CvModule } from './cv/cv.module';

@Module({
    imports: [ProjectModule, EmployeeModule, SharedModule, S3Module, AuthModule, PrinterModule, CvModule],
    controllers: [],
    providers: [PrismaService, PrinterService],
})
export class AppModule { }
