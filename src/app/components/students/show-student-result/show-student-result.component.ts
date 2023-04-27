import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Student, StudentResultView } from 'src/app/model/student.model';
import { StudentResultService } from 'src/services/student-result.service';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-show-student-result',
  templateUrl: './show-student-result.component.html',
  styleUrls: ['./show-student-result.component.css'],
})
export class ShowStudentResultComponent {
  results: StudentResultView[] = [];
  students: Student[] = [];
  studentName?: string = '';
  email?: string | null;
  departmentName?: string | null;
  stdId: number = 0;
  errorMessage?: string;
  constructor(
    private studentResultService: StudentResultService,
    private studentService: StudentService,
    private toaster: ToastrService,
    route: Router
  ) {}

  // department = new FormGroup({
  //   departmentId: new FormControl('', Validators.required),
  // });
  ngOnInit(): void {
    this.getStudent();
  }

  onChangeStudentId(value: any) {
    var stdId = value.target.value;
    const res = this.students.find((x) => x.id == stdId);
    this.stdId = stdId;
    this.studentName = res?.studentName;
    this.email = res?.email;
    this.departmentName = res?.departmentTB.departmentName;
    this.getResult(stdId);
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

  getResult(id: number) {
    this.studentResultService.getResultByStudentId(id).subscribe({
      next: (result) => {
        this.results = result;
      },
      error: (err) => {
        this.results = [];
        this.stdId = 0;
      },
    });
  }
}
