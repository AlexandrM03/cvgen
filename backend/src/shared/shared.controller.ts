import { Body, Controller, Get, Post } from '@nestjs/common';
import { SharedService } from './shared.service';

@Controller('shared')
export class SharedController {
    constructor(private readonly sharedService: SharedService) { }

    @Post('skill')
    async createSkill(@Body('name') name: string) {
        return this.sharedService.createSkill(name);
    }

    @Post('language')
    async createLanguage(@Body('name') name: string) {
        return this.sharedService.createLanguage(name);
    }

    @Get('skills')
    async getSkills() {
        return this.sharedService.getSkills();
    }

    @Get('languages')
    async getLanguages() {
        return this.sharedService.getLanguages();
    }
}
