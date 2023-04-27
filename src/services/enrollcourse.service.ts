import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnrollCourseDto } from 'src/app/model/student.model';

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
}
