import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/model/department.model';
import { DepartmentService } from 'src/services/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];

  constructor(
    private departmentService: DepartmentService,
    private toaster: ToastrService,
    route: Router
  ) {}

  // department = new FormGroup({
  //   departmentId: new FormControl('', Validators.required),
  // });
  ngOnInit(): void {
    // this.getCouesesByDepartment(id);
    this.getAllDepartment();
  }

  getAllDepartment() {
    this.departmentService.getAllDepartment().subscribe({
      next: (dep) => {
        this.departments = dep;
      },
      error: (response) => {
        this.toaster.error(response.error);
      },
    });
  }
  onDeleteDepartment(id: number) {
    if (confirm('Are you delete Department')) {
      this.departmentService.deleteDepartment(id).subscribe({
        next: (cou) => {
          this.toaster.error('Department Delete Success');
          // window.location.reload();
          this.getAllDepartment();
        },
        error: (response) => {
          console.log(response.error);
        },
      });
    }
  }
}
