import { LanguageDto } from './language.dto';

export interface CvLanguageDto {
    cvId: string;
    languageId: string;
    level: string;
    language: LanguageDto;
}