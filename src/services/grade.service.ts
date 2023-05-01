import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GradeLetter } from 'src/app/model/gradeLetter.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  constructor(private http: HttpClient) {}

  url = environment.baseApiUrl;

  getAllGradeLetter(): Observable<GradeLetter[]> {
    return this.http.get<GradeLetter[]>(this.url + '/api/GradeLetter/');
  }
}
