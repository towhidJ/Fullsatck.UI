import { Component } from '@angular/core';
import { Day } from 'src/app/model/day.model';
import { EmployeesService } from './../../../../services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent {
  employees: Day[] = [];
  constructor(private employeeService: EmployeesService) {}
  ngOnInit(): void {
    this.employeeService.getAllDays().subscribe({
      next: (employees) => {
        this.employees = employees;
        console.log(employees);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
