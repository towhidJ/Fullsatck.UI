import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student, StudentDto } from 'src/app/model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  url: string = 'https://localhost:7261';
  getAllStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url + '/api/student');
  }
  getStudentById(id: number): Observable<Student[]> {
    return this.http.get<Student[]>(this.url + '/api/student/getbyid/' + id);
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
}