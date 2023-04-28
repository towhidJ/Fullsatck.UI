import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  StudentResultDto,
  StudentResultView,
} from 'src/app/model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentResultService {
  constructor(private http: HttpClient) {}

  url: string = 'https://localhost:7261';

  getResultByStudentId(id: number): Observable<StudentResultView[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('studentId', id);
    return this.http.get<StudentResultView[]>(
      this.url + '/api/StudentResult/result/',
      { params: queryParams }
    );
  }

  addStudentResult(addResult: StudentResultDto): Observable<string> {
    addResult.id = 0;
    return this.http.post(this.url + '/api/StudentResult/result', addResult, {
      responseType: 'text',
    });
  }
}
