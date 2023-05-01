import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CourseShowView } from 'src/app/model/course.model';
import { environment } from 'src/environments/environment';
import { CourseDto } from './../app/model/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseApiUrl;
  getAllCourse(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url + '/api/courses');
  }
  getCourseById(id: number): Observable<Course[]> {
    return this.http.get<Course[]>(this.url + '/api/courses/getbyid/' + id);
  }

  getCourseByDepId(id: number): Observable<CourseShowView[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('departmentId', id);
    return this.http.get<CourseShowView[]>(
      this.url + '/api/courses/getByDepId/',
      { params: queryParams }
    );
  }

  addCourse(addCourse: CourseDto): Observable<CourseDto> {
    addCourse.id = 0;
    return this.http.post<CourseDto>(
      this.url + '/api/courses/create',
      addCourse
    );
  }

  updateCourse(id: number, updateCourse: CourseDto): Observable<CourseDto> {
    return this.http.put<CourseDto>(
      this.url + '/api/courses/update',
      updateCourse
    );
  }
  deleteCourse(id: number): Observable<number> {
    return this.http.delete<number>(this.url + '/api/courses/remove/' + id);
  }
}
