import { SkillDto } from './skill.dto';

export interface CvSkillDto {
    cvId: string;
    skillId: string;
    level: number;
    skill: SkillDto;
}