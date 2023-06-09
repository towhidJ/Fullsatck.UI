import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/model/course.model';
import { Department } from 'src/app/model/department.model';
import { Semester } from 'src/app/model/semester.model';
import { CourseService } from 'src/services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  departments: Department[] = [];
  semesters: Semester[] = [];

  constructor(
    private courseService: CourseService,
    private toaster: ToastrService,
    route: Router
  ) {}

  // department = new FormGroup({
  //   departmentId: new FormControl('', Validators.required),
  // });
  ngOnInit(): void {
    // this.getCouesesByDepartment(id);
    this.getAllCourse();
  }

  getAllCourse() {
    this.courseService.getAllCourse().subscribe({
      next: (course) => {
        this.courses = course;
      },
      error: (response) => {
        this.toaster.error(response);
      },
    });
  }
  onDeleteCourse(id: number) {
    if (confirm('Are you delete Course')) {
      this.courseService.deleteCourse(id).subscribe({
        next: (cou) => {
          this.toaster.error('Course Delete Success');
          // window.location.reload();
          this.getAllCourse();
        },
        error: (response) => {
          console.log(response);
        },
      });
    }
  }
}
