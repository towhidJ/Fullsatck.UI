import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/model/department.model';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/services/student.service';
import { DepartmentService } from './../../../../services/department.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  departments: Department[] = [];
  constructor(
    private studentService: StudentService,
    private departmentService: DepartmentService,
    private toaster: ToastrService,
    route: Router
  ) {}
  ngOnInit(): void {
    this.getStudent();
  }

  onDeleteStudent(id: number) {
    if (confirm('Are you delete Student')) {
      this.studentService.deleteStudent(id).subscribe({
        next: (student) => {
          this.toaster.error('Student Delete Success');
          // window.location.reload();
          this.getStudent();
        },
        error: (response) => {
          console.log(response);
        },
      });
    }
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
}
