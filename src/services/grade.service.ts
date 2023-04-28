import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GradeLetter } from 'src/app/model/gradeLetter.model';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  constructor(private http: HttpClient) {}

  url = 'https://localhost:7261';

  getAllGradeLetter(): Observable<GradeLetter[]> {
    return this.http.get<GradeLetter[]>(this.url + '/api/GradeLetter/');
  }
}
