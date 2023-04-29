import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Department, DepartmentDto } from 'src/app/model/department.model';
import { DepartmentService } from 'src/services/department.service';

@Component({
  selector: 'app-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrls: ['./add-edit-department.component.css'],
})
export class AddEditDepartmentComponent {
  departments: Department[] = [];
  departmentForm: FormGroup;
  id: number = 0;
  isAddMode: boolean = true;
  loading = false;

  constructor(
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {
    this.departmentForm = new FormGroup({
      id: new FormControl(''),
      departmentCode: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      departmentName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    } as {
      [key in keyof DepartmentDto]: FormControl;
    });
  }
  errorMessage = '';
  btnText = 'Add Course';
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      this.btnText = 'Update Department';
      this.departmentService
        .getDepartmentById(this.id)
        .pipe(first())
        .subscribe((x) => this.departmentForm.patchValue(x));
    }
  }

  get departmentCode() {
    return this.departmentForm.get('departmentCode');
  }
  get departmentName() {
    return this.departmentForm.get('departmentName');
  }

  onSubmit() {
    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.departmentForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.addDepartment();
    } else {
      this.updateDepartment();
    }
  }

  addDepartment() {
    if (this.departmentForm.valid) {
      let body = this.departmentForm.value;
      this.departmentService.addDepartment(body).subscribe({
        next: (data: any) => {
          this.toaster.success('Department Added Success');
          // this.reloadPage();
        },
        error: (err) => {
          this.errorMessage = err.error;
          console.log(this.errorMessage);
          this.toaster.error(this.errorMessage);
        },
      });
    } else {
      console.log(this.departmentForm);
    }
  }

  updateDepartment() {
    this.departmentService
      .updateDepartment(this.departmentForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toaster.success('Department Updated');

          this.router.navigate(['/department'], { relativeTo: this.route });
        },
        error: (error) => {
          this.loading = false;
          this.toaster.error(error.error);
          console.log(error);
        },
      });
  }
}
