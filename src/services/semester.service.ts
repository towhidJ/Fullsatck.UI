import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Semester } from 'src/app/model/semester.model';

@Injectable({
  providedIn: 'root',
})
export class SemesterService {
  constructor(private http: HttpClient) {}

  url: string = 'https://localhost:7261';
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
