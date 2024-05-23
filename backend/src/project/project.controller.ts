import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Get(':id')
    async getProjectById(@Param('id') id: string) {
        const project = await this.projectService.getProjectById(id);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        return project;
    }

    @Get()
    async getAllProjects() {
        return this.projectService.getAllProjects();
    }

    @Post()
    async createProject(@Body() createProjectDto: ProjectDto) {
        return this.projectService.createProject(createProjectDto);
    }

    @Put(':id')
    async updateProject(@Param('id') id: string, @Body() updateProjectDto: ProjectDto) {
        const project = await this.projectService.updateProject(id, updateProjectDto);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        return project;
    }

    @Delete(':id')
    async deleteProject(@Param('id') id: string) {
        const deletedProject = await this.projectService.deleteProject(id);
        if (!deletedProject) {
            throw new NotFoundException('Project not found');
        }
        return deletedProject;
    }

    @Post(':id/assign/:cvId')
    async assignCv(@Param('id') id: string, @Param('cvId') cvId: string) {
        return this.projectService.addCvToProject(id, cvId);
    }
}
