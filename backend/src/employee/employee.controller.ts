import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employee.dto';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    // @Get(':id/cv')
    // async generateCv(@Param('id') id: string) {
    //     return this.employeeService.generateCv(id);
    // }

    @Get(':id')
    async getEmployeeById(@Param('id') id: string) {
        const employee = await this.employeeService.getEmployeeById(id);
        if (!employee) {
            throw new NotFoundException('Employee not found');
        }
        return employee;
    }

    @Get()
    async getEmployees() {
        return this.employeeService.getEmployees();
    }

    @Post()
    async createEmployee(@Body() createEmployeeDto: EmployeeDto) {
        return this.employeeService.createEmployee(createEmployeeDto);
    }

    @Put(':id')
    async updateEmployee(@Param('id') id: string, @Body() updateEmployeeDto: EmployeeDto) {
        const employee = await this.employeeService.updateEmployee(id, updateEmployeeDto);
        if (!employee) {
            throw new NotFoundException('Employee not found');
        }
        return employee;
    }

    @Delete(':id')
    async deleteEmployee(@Param('id') id: string) {
        const deletedEmployee = await this.employeeService.deleteEmployee(id);
        if (!deletedEmployee) {
            throw new NotFoundException('Employee not found');
        }
        return deletedEmployee;
    }

    // @Post(':employeeId/skill')
    // async addSkillToEmployee(
    //     @Param('employeeId') employeeId: string,
    //     @Body('skillId') skillId: string,
    //     @Body('level') level: number
    // ) {
    //     return this.employeeService.addSkillToEmployee(employeeId, skillId, level);
    // }

    // @Delete(':employeeId/skill/:skillId')
    // async removeSkillFromEmployee(
    //     @Param('employeeId') employeeId: string,
    //     @Param('skillId') skillId: string
    // ) {
    //     return this.employeeService.removeSkillFromEmployee(employeeId, skillId);
    // }

    // @Post(':employeeId/language')
    // async addLanguageToEmployee(
    //     @Param('employeeId') employeeId: string,
    //     @Body('languageId') languageId: string,
    //     @Body('level') level: string
    // ) {
    //     return this.employeeService.addLanguageToEmployee(employeeId, languageId, level);
    // }

    // @Delete(':employeeId/language/:languageId')
    // async removeLanguageFromEmployee(
    //     @Param('employeeId') employeeId: string,
    //     @Param('languageId') languageId: string
    // ) {
    //     return this.employeeService.removeLanguageFromEmployee(employeeId, languageId);
    // }
}
