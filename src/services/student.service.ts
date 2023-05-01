import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/model/course.model';
import { Student, StudentDto } from 'src/app/model/student.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseApiUrl;
  getAllStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url + '/api/student');
  }
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(this.url + '/api/student/getbyid/' + id);
  }

  addStudent(addStudent: StudentDto): Observable<StudentDto> {
    addStudent.id = 0;
    // addStudent.registerDate = '0';
    return this.http.post<StudentDto>(
      this.url + '/api/student/create',
      addStudent
    );
  }

  updateStudent(id: number, updateStudent: StudentDto): Observable<StudentDto> {
    // addStudent.registerDate = '0';
    return this.http.put<StudentDto>(
      this.url + '/api/student/update',
      updateStudent
    );
  }
  deleteStudent(id: number): Observable<number> {
    return this.http.delete<number>(this.url + '/api/student/remove/' + id);
  }

  getCourseByStudentId(id?: number): Observable<Course[]> {
    return this.http.get<Course[]>(
      this.url + '/api/student/getcoursebydepid?depId=' + id
    );
  }
}
