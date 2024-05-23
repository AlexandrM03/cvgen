import { LanguageDto } from '../../dto/language.dto';
import { SkillDto } from '../../dto/skill.dto';

export interface SharedState {
    skills: SkillDto[];
    languages: LanguageDto[];
}

export const sharedInitialState: SharedState = {
    skills: [],
    languages: []
};