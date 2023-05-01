import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Semester } from 'src/app/model/semester.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SemesterService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseApiUrl;
  getAllDepartment(): Observable<Semester[]> {
    return this.http.get<Semester[]>(this.url + '/api/semester');
  }

  addDepartment(addSemester: Semester): Observable<Semester> {
    return this.http.post<Semester>(
      this.url + '/api/semester/create',
      addSemester
    );
  }
}
