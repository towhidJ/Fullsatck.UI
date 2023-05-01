import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Day } from 'src/app/model/day.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DaysService {
  constructor(private http: HttpClient) {}

  url = environment.baseApiUrl;

  getAllDays(): Observable<Day[]> {
    return this.http.get<Day[]>(this.url + '/api/day/');
  }
}
