import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClassScheduleViewModel } from 'src/app/model/class-schedule.model';
import { Department } from 'src/app/model/department.model';
import { DepartmentService } from 'src/services/department.service';
import { ClassScheduleService } from './../../../../services/class-schedule.service';

@Component({
  selector: 'app-show-class-schedule',
  templateUrl: './show-class-schedule.component.html',
  styleUrls: ['./show-class-schedule.component.css'],
})
export class ShowClassScheduleComponent {
  schedules: ClassScheduleViewModel[] = [];
  departments: Department[] = [];

  constructor(
    private classScheduleService: ClassScheduleService,
    private departmentService: DepartmentService,
    private toaster: ToastrService,
    route: Router
  ) {}

  // department = new FormGroup({
  //   departmentId: new FormControl('', Validators.required),
  // });
  ngOnInit(): void {
    this.departmentService.getAllDepartment().subscribe({
      next: (departments) => {
        this.departments = departments;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  getScheduleByDepartment(id: number) {
    this.classScheduleService.getScheduleByDepId(id).subscribe({
      next: (schedule) => {
        this.schedules = schedule;
      },
      error: (response) => {
        this.toaster.error(response.error);
      },
    });
  }
  onChangeDepartment(value: any) {
    var depId = value.target.value;
    this.getScheduleByDepartment(depId);
  }
}
