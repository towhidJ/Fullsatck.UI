import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShowAssignView } from 'src/app/model/course-assign.model';
import { environment } from 'src/environments/environment';
import { CourseAssignTeacherDto } from './../app/model/course-assign.model';

@Injectable({
  providedIn: 'root',
})
export class CourseAssignTeacherService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseApiUrl;

  getCourseByDepId(id: number): Observable<ShowAssignView[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('departmentId', id);
    return this.http.get<ShowAssignView[]>(
      this.url + '/api/teacher/getByDepId/',
      { params: queryParams }
    );
  }

  assignCourse(assignCourse: CourseAssignTeacherDto): Observable<string> {
    assignCourse.id = 0;
    return this.http.post(
      this.url + '/api/CourseAssignToTeacher/create',
      assignCourse,
      {
        responseType: 'text',
      }
    );
  }

  unassignCourse(): Observable<string> {
    return this.http.get(this.url + '/api/CourseAssignToTeacher/unassign', {
      responseType: 'text',
    });
  }
}
