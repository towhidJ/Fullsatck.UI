import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from 'src/app/model/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  url: string = 'https://localhost:7261';
  getAllDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(this.url + '/api/department');
  }

  addDepartment(addDepartment: Department): Observable<Department> {
    return this.http.post<Department>(
      this.url + '/api/department/create',
      addDepartment
    );
  }
}
