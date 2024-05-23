import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SharedService {
    constructor(
        private prisma: PrismaService
    ) { }

    async createSkill(name: string) {
        return this.prisma.skill.create({
            data: { name }
        })
    }

    async createLanguage(name: string) {
        return this.prisma.language.create({
            data: { name }
        })
    }

    async getSkills() {
        return this.prisma.skill.findMany();
    }

    async getLanguages() {
        return this.prisma.language.findMany();
    }
}
