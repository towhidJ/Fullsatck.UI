import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseAssignTeacherDto } from 'src/app/model/course-assign.model';
import { Course } from 'src/app/model/course.model';
import { Department } from 'src/app/model/department.model';
import { Teacher } from 'src/app/model/teacher.model';
import { CourseAssignTeacherService } from 'src/services/course-assign-teacher.service';
import { DepartmentService } from 'src/services/department.service';
import { StudentService } from 'src/services/student.service';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-course-assign-teacher',
  templateUrl: './course-assign-teacher.component.html',
  styleUrls: ['./course-assign-teacher.component.css'],
})
export class CourseAssignTeacherComponent implements OnInit {
  departments: Department[] = [];
  courses: Course[] = [];
  teachers: Teacher[] = [];
  teacherName?: string = '';
  creditToBeTaken?: number | 0.0;
  remainingCredit?: number | 0.0;
  courseName?: string | null;
  credit?: number | 0;
  errorMessage?: string;
  courseAssignForm: FormGroup;
  constructor(
    private departmentService: DepartmentService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private courseAssignService: CourseAssignTeacherService,
    private toaster: ToastrService,
    route: Router
  ) {
    this.courseAssignForm = new FormGroup({
      id: new FormControl(''),
      departmentId: new FormControl('', Validators.required),
      teacherId: new FormControl('', Validators.required),
      courseId: new FormControl('', Validators.required),
    } as {
      [key in keyof CourseAssignTeacherDto]: FormControl;
    });
  }
  ngOnInit(): void {
    this.getDepartment();
  }

  get departmentId() {
    return this.courseAssignForm.get('departmentId');
  }
  get teacherId() {
    return this.courseAssignForm.get('teacherId');
  }
  get courseId() {
    return this.courseAssignForm.get('courseId');
  }

  getDepartment() {
    this.departmentService.getAllDepartment().subscribe({
      next: (department) => {
        this.departments = department;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  onChangeDepId(value: any) {
    var depId = value.target.value;
    const res = this.departments.find((x) => x.id == depId);
    if (res == null) {
      this.courses = [];
      this.teachers = [];
      this.courseName = '';
      this.creditToBeTaken = this.remainingCredit = this.credit = 0.0;
    }
    this.getCourseByDepartmentId(depId);
    this.getTeacherByDepartmentId(depId);
    console.log(res);
  }

  onChangeTecId(value: any) {
    var tecId = value.target.value;
    const res = this.teachers.find((x) => x.id == tecId);
    this.teacherName = res?.teacherName;
    this.creditToBeTaken = res?.creditToBeTaken;
    this.remainingCredit = res?.remainingCredit;
  }
  onChangeCourseId(value: any) {
    var courseId = value.target.value;
    const res = this.courses.find((x) => x.id == courseId);

    this.courseName = res?.courseName;
    this.credit = res?.credit;
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
  getTeacherByDepartmentId(depId?: number) {
    this.teacherService.getTeacherByDepId(depId).subscribe({
      next: (teacher) => {
        console.log(teacher);
        this.teachers = teacher;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  onSubmit() {
    this.assignCourse();
  }

  assignCourse() {
    if (this.courseAssignForm.valid) {
      let body = this.courseAssignForm.value;
      this.courseAssignService.assignCourse(body).subscribe({
        next: (data: any) => {
          this.toaster.success(data);
          this.errorMessage = data;
          // this.reloadPage();
        },
        error: (err) => {
          this.errorMessage = err.error;
          this.toaster.error(this.errorMessage);
        },
      });
    } else {
      console.log(this.courseAssignForm);
    }
  }
}
