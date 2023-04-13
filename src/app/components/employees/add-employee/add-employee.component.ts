import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';
import { EmployeesService } from 'src/services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeRequest: Employee = {
    id: '',
    name: '',
    email: '',
    phone: '',
    salary: 0,
    department: '',
  };
  showNoti: string = '';
  constructor(private employeeService: EmployeesService) {}
  ngOnInit(): void {}
  addEmployee() {
    this.employeeService.addEmployee(this.addEmployeeRequest).subscribe({
      next: (employee) => {
        this.showNoti = 'success';
      },
      error: (ex) => {
        this.showNoti = ex.errors.title;
        console.log(ex);
      },
    });
  }
}
