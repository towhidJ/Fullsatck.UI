import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher, TeacherDto } from 'src/app/model/teacher.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseApiUrl;
  getAllTeacher(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.url + '/api/Teacher');
  }
  getTeacherById(id: number): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.url + '/api/Teacher/getbyid/' + id);
  }

  addTeacher(addTeacher: TeacherDto): Observable<TeacherDto> {
    addTeacher.id = 0;
    return this.http.post<TeacherDto>(
      this.url + '/api/Teacher/create',
      addTeacher
    );
  }

  updateTeacher(id: number, updateTeacher: TeacherDto): Observable<TeacherDto> {
    return this.http.put<TeacherDto>(
      this.url + '/api/Teacher/update',
      updateTeacher
    );
  }
  deleteTeacher(id: number): Observable<number> {
    return this.http.delete<number>(this.url + '/api/Teacher/remove/' + id);
  }
  getTeacherByDepId(id?: number): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(
      this.url + '/api/teacher/getteacherbydepid?depId=' + id
    );
  }
}
