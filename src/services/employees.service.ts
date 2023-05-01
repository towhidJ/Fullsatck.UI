import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Day } from 'src/app/model/day.model';
import { environment } from 'src/environments/environment';
import { Employee } from './../app/model/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  // baseApiUrl: string =environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  url: string = environment.baseApiUrl;
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url + '/api/Employee');
  }
  getAllDays(): Observable<Day[]> {
    return this.http.get<Day[]>(this.url + '/api/Auth');
  }

  addEmployee(addEmployee: Employee): Observable<Employee> {
    addEmployee.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Employee>(this.url + '/api/Employee', addEmployee);
  }
}
