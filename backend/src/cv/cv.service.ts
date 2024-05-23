import { Injectable, NotFoundException } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { PrismaService } from 'src/prisma.service';
import { UpdateCvDto } from './dto/update-cv.dto';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class CvService {
    constructor(
        private prisma: PrismaService,
        private printer: PrinterService,
        private s3: S3Service
    ) { }

    async getCvById(id: string) {
        return this.prisma.cv.findUnique({
            where: { id },
            include: {
                EmployeeLanguage: {
                    include: {
                        language: true
                    }
                },
                EmployeeSkill: {
                    include: {
                        skill: true
                    }
                },
                CvProject: {
                    include: {
                        project: true
                    }
                }
            }
        });
    }

    async getCvs(employeeId: string) {
        const cvs = await this.prisma.cv.findMany({
            where: {
                employeeId
            },
            include: {
                EmployeeLanguage: {
                    include: {
                        language: true
                    }
                },
                EmployeeSkill: {
                    include: {
                        skill: true
                    }
                },
                CvProject: {
                    include: {
                        project: true
                    }
                }
            }
        });

        // id: string;
        // name: string;
        // url ?: string;
        // firstName ?: string;
        // lastName ?: string;
        // email ?: string;
        // specialization ?: string;
        // department ?: string;
        // employeeId: string;
        // skills ?: {
        //     skillId: string;
        //     level: number;
        // }[];
        // languages ?: {
        //     languageId: string;
        //     level: number;
        // }[];
        // projects ?: {
        //     projectId: string;
        // }[];

        return cvs.map(cv => ({
            // id: cv.id,
            // name: cv.name,
            // url: cv.url,
            // firstName: cv.firstName,
            // lastName: cv.lastName,
            // email: cv.email,
            // specialization: cv.specialization,
            // department: cv.department,
            // employeeId: cv.employeeId,
            // skills: cv.EmployeeSkill.map(skill => ({
            //     skillId: skill.skillId,
            //     level: skill.level
            // })),
            // languages: cv.EmployeeLanguage.map(language => ({
            //     languageId: language.languageId,
            //     level: language.level
            // })),
            // projects: cv.CvProject.map(project => ({
            //     projectId: project.projectId
            // }))
            ...this.returnCvFields(cv)
        }));
    }

    private returnCvFields(cv: any) {
        return {
            id: cv.id,
            name: cv.name,
            url: cv.url,
            firstName: cv.firstName,
            lastName: cv.lastName,
            email: cv.email,
            specialization: cv.specialization,
            department: cv.department,
            employeeId: cv.employeeId,
            skills: cv.EmployeeSkill.map(skill => ({
                skillId: skill.skillId,
                level: skill.level
            })),
            languages: cv.EmployeeLanguage.map(language => ({
                languageId: language.languageId,
                level: language.level
            })),
            projects: cv.CvProject.map(project => ({
                projectId: project.projectId
            }))
        };
    }

    async createCv(employeeId: string) {
        const cv = await this.prisma.cv.create({
            data: {
                employeeId
            },
            include: {
                EmployeeLanguage: {
                    include: {
                        language: true
                    }
                },
                EmployeeSkill: {
                    include: {
                        skill: true
                    }
                },
                CvProject: {
                    include: {
                        project: true
                    }
                }
            }
        });

        return this.returnCvFields(cv);
    }

    // async updateCv(id: string, dto: UpdateCvDto) {
    //     return this.prisma.cv.update({
    //         where: { id },
    //         data: {
    //             ...dto
    //         }
    //     });
    // }

    async updateCv(id: string, dto: UpdateCvDto) {
        await this.prisma.cvSkill.deleteMany({
            where: {
                cvId: id,
            },
        });
        await this.prisma.cvLanguage.deleteMany({
            where: {
                cvId: id,
            },
        });
        await this.prisma.cvProject.deleteMany({
            where: {
                cvId: id,
            },
        });

        if (dto.skills) {
            for (const skill of dto.skills) {
                await this.prisma.cvSkill.create({
                    data: {
                        cvId: id,
                        skillId: skill.skillId,
                        level: skill.level,
                    },
                });
            }
        }

        if (dto.languages) {
            for (const language of dto.languages) {
                await this.prisma.cvLanguage.create({
                    data: {
                        cvId: id,
                        languageId: language.languageId,
                        level: language.level,
                    },
                });
            }
        }

        if (dto.projects) {
            console.log(dto.projects)
            for (const project of dto.projects) {
                await this.prisma.cvProject.create({
                    data: {
                        cvId: id,
                        projectId: project.projectId,
                    },
                });
            }
        }

        const updatedCv = await this.prisma.cv.update({
            where: { id },
            data: {
                name: dto.name,
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                specialization: dto.specialization,
                department: dto.department
            },
            include: {
                EmployeeLanguage: {
                    include: {
                        language: true
                    }
                },
                EmployeeSkill: {
                    include: {
                        skill: true
                    }
                },
                CvProject: {
                    include: {
                        project: true
                    }
                }
            }
        });

        return this.returnCvFields(updatedCv);
    }

    async deleteCv(id: string) {
        await this.prisma.cv.delete({
            where: { id }
        })

        return { id };
    }

    async addSkillToCv(cvId: string, skillId: string, level: number) {
        return this.prisma.cvSkill.create({
            data: {
                cvId,
                skillId,
                level
            }
        });
    }

    async removeSkillFromCv(cvId: string, skillId: string) {
        return this.prisma.cvSkill.deleteMany({
            where: {
                cvId,
                skillId
            }
        });
    }

    async addLanguageToCv(cvId: string, languageId: string, level: string) {
        return this.prisma.cvLanguage.create({
            data: {
                cvId,
                languageId,
                level
            }
        });
    }

    async removeLanguageFromCv(cvId: string, languageId: string) {
        return this.prisma.cvLanguage.deleteMany({
            where: {
                cvId,
                languageId
            }
        });
    }

    async generateCv(cvId: string) {
        const cv = await this.getCvById(cvId);
        if (!cv) {
            throw new NotFoundException('CV not found');
        }

        const path = await this.printer.generateCv({
            firstName: cv.firstName,
            lastName: cv.lastName,
            email: cv.email,
            specialization: cv.specialization,
            department: cv.department,
            skills: cv.EmployeeSkill.map(skill => ({
                name: skill.skill.name,
                level: skill.level
            })),
            languages: cv.EmployeeLanguage.map(language => ({
                name: language.language.name,
                level: language.level
            })),
            projects: cv.CvProject.map(project => ({
                name: project.project.name,
                startDate: project.project.startDate,
                endDate: project.project.endDate,
                teamSize: project.project.teamSize,
                description: project.project.description,
                responsibilities: project.project.responsibilities
            }))
        }, cvId);

        const url = await this.s3.getPresignedURL(path);

        return { url };
    }
}
