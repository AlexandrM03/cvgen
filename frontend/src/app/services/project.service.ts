import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectDto } from '../dto/project.dto';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    constructor(
        private http: HttpClient
    ) { }

    getProjects(): Observable<ProjectDto[]> {
        return this.http.get<ProjectDto[]>('/project');
    }

    createProject(project: ProjectDto): Observable<ProjectDto> {
        return this.http.post<ProjectDto>('/project', project);
    }

    getProject(id: string): Observable<ProjectDto> {
        return this.http.get<ProjectDto>(`/project/${id}`);
    }

    updateProject(project: ProjectDto): Observable<ProjectDto> {
        return this.http.put<ProjectDto>(`/project/${project.id}`, project);
    }
}
