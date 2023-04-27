import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/model/course.model';
import { EnrollCourseDto, Student } from 'src/app/model/student.model';
import { StudentService } from 'src/services/student.service';
import { EnrollcourseService } from './../../../../services/enrollcourse.service';

@Component({
  selector: 'app-enroll-student',
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.css'],
})
export class EnrollStudentComponent implements OnInit {
  students: Student[] = [];
  courses: Course[] = [];
  studentName?: string = '';
  email?: string | null;
  departmentName?: string | null;
  errorMessage?: string;
  enrollForm: FormGroup;
  constructor(
    private studentService: StudentService,
    private enrollcourseService: EnrollcourseService,
    private toaster: ToastrService,
    route: Router
  ) {
    this.enrollForm = new FormGroup({
      id: new FormControl(''),
      date: new FormControl('', Validators.required),
      studentId: new FormControl('', Validators.required),
      courseId: new FormControl('', Validators.required),
    } as {
      [key in keyof EnrollCourseDto]: FormControl;
    });
  }
  ngOnInit(): void {
    this.getStudent();
  }

  get date() {
    return this.enrollForm.get('date');
  }
  get studentId() {
    return this.enrollForm.get('studentId');
  }
  get courseId() {
    return this.enrollForm.get('courseId');
  }

  getStudent() {
    this.studentService.getAllStudent().subscribe({
      next: (student) => {
        this.students = student;
        console.log(student);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  onChangeStudentId(value: any) {
    var stdId = value.target.value;
    const res = this.students.find((x) => x.id == stdId);
    this.studentName = res?.studentName;
    this.email = res?.email;
    this.departmentName = res?.departmentTB.departmentName;
    this.getCourseByDepartmentId(res?.departmentId);
    console.log(res);
  }

  getCourseByDepartmentId(depId?: number) {
    this.studentService.getCourseByStudentId(depId).subscribe({
      next: (course) => {
        this.courses = course;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  onSubmit() {
    this.enrollCourse();
  }

  enrollCourse() {
    console.log(this.enrollForm);
    if (this.enrollForm.valid) {
      let body = this.enrollForm.value;
      this.enrollcourseService.enrollCourse(body).subscribe({
        next: (data: any) => {
          console.log(data);
          this.toaster.success(data);
          this.errorMessage = data;
          // this.reloadPage();
        },
        error: (err) => {
          this.errorMessage = err.error;
          console.log(err);
          this.toaster.error(this.errorMessage);
        },
      });
    } else {
      console.log(this.enrollForm);
    }
  }
}
