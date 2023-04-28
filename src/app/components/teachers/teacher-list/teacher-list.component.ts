import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/model/department.model';
import { Teacher } from 'src/app/model/teacher.model';
import { DepartmentService } from 'src/services/department.service';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
})
export class TeacherListComponent {
  teachers: Teacher[] = [];
  departments: Department[] = [];
  constructor(
    private teacherService: TeacherService,
    private departmentService: DepartmentService,
    private toaster: ToastrService,
    route: Router
  ) {}
  ngOnInit(): void {
    this.getAllTeacher();
  }

  onDeleteTeacher(id: number) {
    if (confirm('Are you delete Student')) {
      this.teacherService.deleteTeacher(id).subscribe({
        next: (teacher) => {
          this.toaster.error('Teacher Delete Success');
          // window.location.reload();
          this.getAllTeacher();
        },
        error: (response) => {
          console.log(response);
        },
      });
    }
  }

  getAllTeacher() {
    this.teacherService.getAllTeacher().subscribe({
      next: (teacher) => {
        this.teachers = teacher;
        console.log(this.teachers);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
