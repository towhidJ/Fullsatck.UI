import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Designation } from 'src/app/model/designation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DesiganationService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseApiUrl;
  getAllDesignation(): Observable<Designation[]> {
    return this.http.get<Designation[]>(this.url + '/api/desination');
  }

  addDesignation(addDesignation: Designation): Observable<Designation> {
    addDesignation.id = 0;
    return this.http.post<Designation>(
      this.url + '/api/designation/create',
      addDesignation
    );
  }
}
