import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CvDto } from '../dto/cv.dto';

@Injectable({
    providedIn: 'root'
})
export class CvService {
    constructor(
        private http: HttpClient
    ) { }

    getCvs(employeeId: string): Observable<CvDto[]> {
        return this.http.get<CvDto[]>(`/cv/employee/${employeeId}`);
    }

    createCv(employeeId: string): Observable<CvDto> {
        return this.http.post<CvDto>(`/cv/employee/${employeeId}`, {});
    }

    getCv(id: string): Observable<CvDto> {
        return this.http.get<CvDto>(`/cv/${id}`);
    }

    updateCv(cv: CvDto): Observable<CvDto> {
        return this.http.put<CvDto>(`/cv/${cv.id}`, cv);
    }

    deleteCv(id: string): Observable<Pick<CvDto, 'id'>> {
        return this.http.delete<Pick<CvDto, 'id'>>(`/cv/${id}`);
    }

    generateCv(id: string): Observable<{ url: string }> {
        return this.http.get<{ url: string }>(`/cv/${id}/generate`);
    }
}
