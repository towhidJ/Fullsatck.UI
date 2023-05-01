import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, DepartmentDto } from 'src/app/model/department.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseApiUrl;
  getAllDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(this.url + '/api/department');
  }
  getDepartmentById(id: number): Observable<Department[]> {
    return this.http.get<Department[]>(
      this.url + '/api/department/getbyid/' + id
    );
  }
  addDepartment(addDepartment: Department): Observable<Department> {
    addDepartment.id = 0;
    return this.http.post<Department>(
      this.url + '/api/department/create',
      addDepartment
    );
  }
  updateDepartment(updateDepartment: DepartmentDto): Observable<DepartmentDto> {
    return this.http.put<DepartmentDto>(
      this.url + '/api/department/update',
      updateDepartment
    );
  }
  deleteDepartment(id: number): Observable<number> {
    return this.http.delete<number>(this.url + '/api/department/remove/' + id);
  }
}
