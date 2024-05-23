import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getProjectById(id: string) {
        const project = await this.prisma.project.findUnique({
            where: { id },
            include: {
                techStack: true,
                roles: true,
                CvProject: true,
            },
        });
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        return project;
    }

    async getAllProjects() {
        return this.prisma.project.findMany();
    }

    async createProject(data: ProjectDto) {
        return this.prisma.project.create({
            data,
            include: {
                techStack: true,
                roles: true,
                CvProject: true,
            },
        });
    }

    async updateProject(id: string, data: ProjectDto) {
        const project = await this.getProjectById(id);
        return this.prisma.project.update({
            where: { id },
            data: {
                ...data,
                techStack: {
                    connect: data.techStackIds?.map((id) => ({ id })),
                },
                roles: {
                    connect: data.roleIds?.map((id) => ({ id })),
                },
            },
            include: {
                techStack: true,
                roles: true,
                CvProject: true,
            },
        });
    }

    async deleteProject(id: string) {
        const project = await this.getProjectById(id);
        return this.prisma.project.delete({
            where: { id },
        });
    }

    async addCvToProject(projectId: string, cvId: string) {
        return this.prisma.cvProject.create({
            data: {
                project: { connect: { id: projectId } },
                cv: { connect: { id: cvId } },
            },
        });
    }
}
