import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async getEmployeeById(id: string) {
        return this.prisma.employee.findUnique({
            where: { id },
            include: {
                Cv: true,
            }
        });
    }

    async getEmployees() {
        return this.prisma.employee.findMany();
    }

    async createEmployee(data: EmployeeDto) {
        return this.prisma.employee.create({
            data
        });
    }

    async updateEmployee(id: string, data: EmployeeDto) {
        return this.prisma.employee.update({
            where: { id },
            data
        });
    }

    async deleteEmployee(id: string) {
        return this.prisma.employee.delete({
            where: { id }
        });
    }

    // async addSkillToEmployee(employeeId: string, skillId: string, level: number) {
    //     return this.prisma.employeeSkill.create({
    //         data: {
    //             employeeId,
    //             skillId,
    //             level
    //         }
    //     });
    // }

    // async removeSkillFromEmployee(employeeId: string, skillId: string) {
    //     return this.prisma.employeeSkill.deleteMany({
    //         where: {
    //             employeeId,
    //             skillId
    //         }
    //     });
    // }

    // async addLanguageToEmployee(employeeId: string, languageId: string, level: string) {
    //     return this.prisma.employeeLanguage.create({
    //         data: {
    //             employeeId,
    //             languageId,
    //             level
    //         }
    //     });
    // }

    // async removeLanguageFromEmployee(employeeId: string, languageId: string) {
    //     return this.prisma.employeeLanguage.deleteMany({
    //         where: {
    //             employeeId,
    //             languageId
    //         }
    //     });
    // }

    // async generateCv(employeeId: string) {
    //     const employee = await this.getEmployeeById(employeeId);
    //     return this.cv.generateCv(
    //         {
    //             firstName: employee.firstName,
    //             lastName: employee.lastName,
    //             email: employee.email,
    //             specialization: employee.specialization,
    //             department: employee.department,
    //             skills: employee.EmployeeSkill.map(skill => ({
    //                 name: skill.skill.name,
    //                 level: skill.level
    //             })),
    //             languages: employee.EmployeeLanguage.map(language => ({
    //                 name: language.language.name,
    //                 level: language.level
    //             })),
    //             projects: employee.ProjectEmployee.map(project => ({
    //                 name: project.project.name,
    //                 startDate: project.project.startDate,
    //                 endDate: project.project.endDate,
    //                 teamSize: project.project.teamSize,
    //                 description: project.project.description,
    //                 responsibilities: project.project.responsibilities
    //             }))
    //         }
    //     );
    // }
}
