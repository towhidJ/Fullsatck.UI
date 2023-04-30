import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AllocateClassDto,
  ClassScheduleViewModel,
} from 'src/app/model/class-schedule.model';

@Injectable({
  providedIn: 'root',
})
export class ClassScheduleService {
  constructor(private http: HttpClient) {}

  url: string = 'https://localhost:7261';

  getScheduleByDepId(id: number): Observable<ClassScheduleViewModel[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('depId', id);
    return this.http.get<ClassScheduleViewModel[]>(
      this.url + '/api/ClassSchedule',
      { params: queryParams }
    );
  }

  addSchedule(addClass: AllocateClassDto): Observable<string> {
    addClass.id = 0;
    return this.http.post(this.url + '/api/ClassSchedule/addclass', addClass, {
      responseType: 'text',
    });
  }

  unallocatedClass(): Observable<string> {
    return this.http.get(this.url + '/api/ClassSchedule/unallocatedClass', {
      responseType: 'text',
    });
  }
}
