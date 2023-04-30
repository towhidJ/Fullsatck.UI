import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShowAssignView } from 'src/app/model/course-assign.model';
import { Department } from 'src/app/model/department.model';
import { Semester } from 'src/app/model/semester.model';
import { CourseAssignTeacherService } from 'src/services/course-assign-teacher.service';
import { DepartmentService } from 'src/services/department.service';

@Component({
  selector: 'app-show-assign-teacher',
  templateUrl: './show-assign-teacher.component.html',
  styleUrls: ['./show-assign-teacher.component.css'],
})
export class ShowAssignTeacherComponent implements OnInit {
  courses: ShowAssignView[] = [];
  departments: Department[] = [];
  semesters: Semester[] = [];

  constructor(
    private courseAssignService: CourseAssignTeacherService,
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
    this.courseAssignService.getCourseByDepId(id).subscribe({
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
    this.getCouesesByDepartment(depId);
  }

  onUnassignCourse() {
    if (confirm('Are you unallocated all class?')) {
      this.courseAssignService.unassignCourse().subscribe({
        next: (data: any) => {
          this.toaster.success(data);
          // this.reloadPage();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
