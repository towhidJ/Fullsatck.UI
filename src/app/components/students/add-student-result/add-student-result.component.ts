import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/model/course.model';
import { GradeLetter } from 'src/app/model/gradeLetter.model';
import { StudentResultDto, StudentView } from 'src/app/model/student.model';
import { EnrollcourseService } from 'src/services/enrollcourse.service';
import { GradeService } from 'src/services/grade.service';
import { StudentResultService } from 'src/services/student-result.service';

@Component({
  selector: 'app-add-student-result',
  templateUrl: './add-student-result.component.html',
  styleUrls: ['./add-student-result.component.css'],
})
export class AddStudentResultComponent implements OnInit {
  students: StudentView[] = [];
  courses: Course[] = [];
  gradeLetters: GradeLetter[] = [];
  studentName?: string = '';
  email?: string | null;
  departmentName?: string | null;
  errorMessage?: string;
  resultForm: FormGroup;
  constructor(
    private gradeLetterService: GradeService,
    private enrollcourseService: EnrollcourseService,
    private resultService: StudentResultService,
    private toaster: ToastrService,
    route: Router
  ) {
    this.resultForm = new FormGroup({
      id: new FormControl(''),
      studentId: new FormControl('', Validators.required),
      gradeLetterId: new FormControl('', Validators.required),
      courseId: new FormControl('', Validators.required),
    } as {
      [key in keyof StudentResultDto]: FormControl;
    });
  }
  ngOnInit(): void {
    this.getStudent();
    this.getAllGradeLetter();
  }

  get gradeLetterId() {
    return this.resultForm.get('gradeLetterId');
  }
  get studentId() {
    return this.resultForm.get('studentId');
  }
  get courseId() {
    return this.resultForm.get('courseId');
  }

  getStudent() {
    this.enrollcourseService.getStudentByEnrollCourse().subscribe({
      next: (student) => {
        this.students = student;
        console.log(student);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  getAllGradeLetter() {
    this.gradeLetterService.getAllGradeLetter().subscribe({
      next: (gradeLetter) => {
        this.gradeLetters = gradeLetter;
      },
      error: (ex) => {
        console.log(ex);
      },
    });
  }

  onChangeStudentId(value: any) {
    var stdId = value.target.value;
    const res = this.students.find((x) => x.studentId == stdId);
    this.studentName = res?.studentName;
    this.email = res?.email;
    this.departmentName = res?.departmentName;
    this.getCourseEnrollmentById(stdId);
  }

  getCourseEnrollmentById(stdId: number) {
    this.enrollcourseService.getCourseByEnrollStudentId(stdId).subscribe({
      next: (course) => {
        this.courses = course;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  onSubmit() {
    this.addResult();
  }

  addResult() {
    if (this.resultForm.valid) {
      let body = this.resultForm.value;
      this.resultService.addStudentResult(body).subscribe({
        next: (data: any) => {
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
      console.log(this.resultForm);
    }
  }
}
