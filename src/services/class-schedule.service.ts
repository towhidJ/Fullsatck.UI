import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassScheduleViewModel } from 'src/app/model/class-schedule.model';

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
}
