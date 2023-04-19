import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseShowView } from 'src/app/model/course.model';
import { Department } from 'src/app/model/department.model';
import { Semester } from 'src/app/model/semester.model';
import { CourseService } from 'src/services/course.service';
import { DepartmentService } from 'src/services/department.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses: CourseShowView[] = [];
  departments: Department[] = [];
  semesters: Semester[] = [];

  constructor(
    private courseService: CourseService,
    private departmentService: DepartmentService,
    private toaster: ToastrService,
    route: Router
  ) {}

  // department = new FormGroup({
  //   departmentId: new FormControl('', Validators.required),
  // });
  ngOnInit(): void {
    // this.getCouesesByDepartment(id);
    this.departmentService.getAllDepartment().subscribe({
      next: (departments) => {
        this.departments = departments;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  getCouesesByDepartment(id: number) {
    this.courseService.getCourseByDepId(id).subscribe({
      next: (course) => {
        this.courses = course;
      },
      error: (response) => {
        this.toaster.error(response);
      },
    });
  }
  onChangeDepartment(value: any) {
    var depId = value.target.value;
    console.log(depId);
    this.getCouesesByDepartment(depId);
  }
}
