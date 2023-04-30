import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Day } from 'src/app/model/day.model';

@Injectable({
  providedIn: 'root',
})
export class DaysService {
  constructor(private http: HttpClient) {}

  url = 'https://localhost:7261';

  getAllDays(): Observable<Day[]> {
    return this.http.get<Day[]>(this.url + '/api/day/');
  }
}
