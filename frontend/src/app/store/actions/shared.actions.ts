import { createAction, props } from '@ngrx/store';
import { SkillDto } from '../../dto/skill.dto';
import { LanguageDto } from '../../dto/language.dto';

export enum SharedActionsEnum {
    GET_SKILLS = '[Shared] Get Skills',
    GET_SKILLS_SUCCESS = '[Shared] Get Skills Success',
    GET_LANGUAGES = '[Shared] Get Languages',
    GET_LANGUAGES_SUCCESS = '[Shared] Get Languages Success',
}

export const getSkills = createAction(SharedActionsEnum.GET_SKILLS);

export const getSkillsSuccess = createAction(
    SharedActionsEnum.GET_SKILLS_SUCCESS,
    props<{ skills: SkillDto[] }>()
);

export const getLanguages = createAction(SharedActionsEnum.GET_LANGUAGES);

export const getLanguagesSuccess = createAction(
    SharedActionsEnum.GET_LANGUAGES_SUCCESS,
    props<{ languages: LanguageDto[] }>()
);