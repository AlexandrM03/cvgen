import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CvService } from './cv.service';
import { UpdateCvDto } from './dto/update-cv.dto';

@Controller('cv')
export class CvController {
    constructor(private readonly cvService: CvService) { }

    @Get(':id/generate')
    async generateCv(@Param('id') id: string) {
        return this.cvService.generateCv(id);
    }

    @Get('employee/:employeeId')
    async getCvs(@Param('employeeId') employeeId: string) {
        return this.cvService.getCvs(employeeId);
    }

    @Get(':id')
    async getCvById(@Param('id') id: string) {
        return this.cvService.getCvById(id);
    }

    @Post('employee/:employeeId')
    async createCv(@Param('employeeId') employeeId: string) {
        return this.cvService.createCv(employeeId);
    }

    @Put(':id')
    async updateCv(@Param('id') id: string, @Body() dto: UpdateCvDto) {
        return this.cvService.updateCv(id, dto);
    }

    @Post(':cvId/skill')
    async addSkillToCv(
        @Param('cvId') cvId: string,
        @Body('skillId') skillId: string,
        @Body('level') level: number
    ) {
        return this.cvService.addSkillToCv(cvId, skillId, level);
    }

    @Delete(':cvId/skill/:skillId')
    async removeSkillFromCv(
        @Param('cvId') cvId: string,
        @Param('skillId') skillId: string
    ) {
        return this.cvService.removeSkillFromCv(cvId, skillId);
    }

    @Post(':cvId/language')
    async addLanguageToCv(
        @Param('cvId') cvId: string,
        @Body('languageId') languageId: string,
        @Body('level') level: string
    ) {
        return this.cvService.addLanguageToCv(cvId, languageId, level);
    }

    @Delete(':cvId/language/:languageId')
    async removeLanguageFromCv(
        @Param('cvId') cvId: string,
        @Param('languageId') languageId: string
    ) {
        return this.cvService.removeLanguageFromCv(cvId, languageId);
    }

    @Delete(':id')
    async deleteCv(@Param('id') id: string) {
        return this.cvService.deleteCv(id);
    }
}
