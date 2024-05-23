import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SkillDto } from '../dto/skill.dto';
import { Observable } from 'rxjs';
import { LanguageDto } from '../dto/language.dto';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    constructor(
        private http: HttpClient
    ) { }

    getSkills(): Observable<SkillDto[]> {
        return this.http.get<SkillDto[]>('/shared/skills');
    }

    getLanguages(): Observable<LanguageDto[]> {
        return this.http.get<LanguageDto[]>('/shared/languages');
    }
}
