import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { EmployeeCvDto } from './dto/employee-cv.dto';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class PrinterService {
    private readonly textMarginX = 40;
    private readonly textMarginX2 = 280;

    constructor(
        private s3: S3Service
    ) { }

    async generateCv(employee: EmployeeCvDto, cvId: string) {
        const pdfPath = `resume_${employee.firstName}_${employee.lastName}_${cvId}.pdf`;
        const pdfDoc = new PDFDocument({ size: 'A4' });
        // const pdfStream = createWriteStream(pdfPath);
        const buffers = [];
        pdfDoc.on('data', buffers.push.bind(buffers));
        pdfDoc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            this.s3.createObject(pdfPath, pdfData, 'application/pdf');
        });
        // 595 x 842

        // pdfDoc.pipe(pdfStream);

        this.generateHeader(pdfDoc, employee);

        this.generateEmployeeInfo(pdfDoc, employee);

        this.generateSidebar(pdfDoc, employee);

        pdfDoc.strokeColor('#CA4452')
            .lineWidth(1)
            .moveTo(250, 170)
            .lineTo(250, 600)
            .stroke();

        this.generateProjects(pdfDoc, employee);

        pdfDoc.end();

        return pdfPath;
    }

    private generateHeader(pdfDoc: typeof PDFDocument, employee: EmployeeCvDto) {
        pdfDoc.image("logo.png", 500, 15, { width: 70 })
            .strokeColor('#CA4452')
            .lineWidth(1)
            .moveTo(20, 35)
            .lineTo(575, 35)
            .stroke();
    }

    private generateEmployeeInfo(pdfDoc: typeof PDFDocument, employee: EmployeeCvDto) {
        pdfDoc.fontSize(24)
            .font('Mulish-Bold.ttf')
            .fillColor('#353535')
            .text(`${employee.firstName} ${employee.lastName}`, this.textMarginX, 60);

        pdfDoc.fontSize(14)
            .font('Mulish-Regular.ttf')
            .fillColor('#353535')
            .text(employee.department.toUpperCase(), this.textMarginX, 100);
    }

    private generateSidebar(pdfDoc: typeof PDFDocument, employee: EmployeeCvDto) {
        const options = {
            width: 200,
            lineGap: 5
        };

        let textMarginY = 180;
        pdfDoc.fontSize(12)
            .font('Mulish-Bold.ttf')
            .text('Language proficiency:', this.textMarginX, textMarginY)
            .font('Mulish-Regular.ttf');

        employee.languages.forEach((language, index) => {
            textMarginY += 20;
            pdfDoc.text(`${language.name} - ${language.level}`, this.textMarginX, textMarginY);
        });

        textMarginY += 40;
        pdfDoc.fontSize(12)
            .font('Mulish-Bold.ttf')
            .text('Specialization:', this.textMarginX, textMarginY)
            .font('Mulish-Regular.ttf')
            .text(employee.specialization, this.textMarginX, textMarginY + 20, options);

        textMarginY += pdfDoc.heightOfString(employee.specialization, options) + 40;

        pdfDoc.fontSize(12)
            .font('Mulish-Bold.ttf')
            .text('Email:', this.textMarginX, textMarginY)
            .font('Mulish-Regular.ttf')
            .text(employee.email, this.textMarginX, textMarginY + 20, options);

        textMarginY += pdfDoc.heightOfString(employee.email, options) + 40;

        pdfDoc.fontSize(12)
            .font('Mulish-Bold.ttf')
            .text('Skills:', this.textMarginX, textMarginY)
            .font('Mulish-Regular.ttf');

        employee.skills.forEach((skill, index) => {
            textMarginY += 20;
            pdfDoc.text(`${skill.name}`, this.textMarginX, textMarginY);
            textMarginY += 20;
            const skillLevel = skill.level * 20;
            const freeSpace = 100 - skillLevel;
            pdfDoc.rect(this.textMarginX, textMarginY, skillLevel, 10).fillAndStroke('#CA4452');
            pdfDoc.rect(this.textMarginX + skillLevel, textMarginY, freeSpace, 10).fillAndStroke('#E5E5E5');
            pdfDoc.fillColor('#353535');
        });
    }

    private generateProjects(pdfDoc: typeof PDFDocument, employee: EmployeeCvDto) {
        const options = {
            width: 300,
            lineGap: 5
        };
        let textMarginY = 180;

        pdfDoc.fontSize(12)
            .font('Mulish-Bold.ttf')
            .text('Projects:', this.textMarginX2, textMarginY)
            .font('Mulish-Regular.ttf');

        employee.projects.forEach((project, index) => {
            textMarginY += 30;
            pdfDoc.lineWidth(1).moveTo(250, textMarginY).lineTo(575, textMarginY).stroke();
            textMarginY += 20;
            pdfDoc.font('Mulish-Bold.ttf').text(project.name, this.textMarginX2, textMarginY, options);
            pdfDoc.font('Mulish-Regular.ttf');
            textMarginY += 20;
            pdfDoc.text(
                `${project.startDate.toLocaleDateString()} - ${project.endDate.toLocaleDateString()}`,
                this.textMarginX2, textMarginY, options);
            textMarginY += 20;
            pdfDoc.text(`Team size: ${project.teamSize}`, this.textMarginX2, textMarginY, options);
            textMarginY += 20;
            pdfDoc.text(`Description: ${project.description}`, this.textMarginX2, textMarginY, options);
            textMarginY += pdfDoc.heightOfString(project.description, options) + 20;
            pdfDoc.text(`Responsibilities: ${project.responsibilities}`, this.textMarginX2, textMarginY, options);
            textMarginY += pdfDoc.heightOfString(project.responsibilities, options) + 20;
        });
    }
}
