import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnrollCourseDto, StudentView } from 'src/app/model/student.model';
import { Course } from './../app/model/course.model';

@Injectable({
  providedIn: 'root',
})
export class EnrollcourseService {
  constructor(private http: HttpClient) {}

  url: string = 'https://localhost:7261';

  enrollCourse(enrollCourse: EnrollCourseDto): Observable<string> {
    enrollCourse.id = 0;
    return this.http.post(this.url + '/api/enrollcourse/enroll', enrollCourse, {
      responseType: 'text',
    });
  }

  getStudentByEnrollCourse(): Observable<StudentView[]> {
    return this.http.get<StudentView[]>(
      this.url + '/api/StudentResult/getstudentbyenroll/'
    );
  }
  getCourseByEnrollStudentId(id: number): Observable<Course[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('studentId', id);
    return this.http.get<Course[]>(
      this.url + '/api/StudentResult/getcoursebyreg?/',
      { params: queryParams }
    );
  }
}
