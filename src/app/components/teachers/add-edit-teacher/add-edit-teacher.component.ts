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
import { Department } from 'src/app/model/department.model';
import { Designation } from 'src/app/model/designation.model';
import { TeacherDto } from 'src/app/model/teacher.model';
import { DepartmentService } from 'src/services/department.service';
import { DesiganationService } from 'src/services/desiganation.service';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-add-edit-teacher',
  templateUrl: './add-edit-teacher.component.html',
  styleUrls: ['./add-edit-teacher.component.css'],
})
export class AddEditTeacherComponent {
  departments: Department[] = [];
  designations: Designation[] = [];
  teacherForm: FormGroup;
  id: number = 0;
  isAddMode: boolean = true;
  loading = false;
  readonly = '';

  constructor(
    private departmentService: DepartmentService,
    private designationService: DesiganationService,
    private teacherService: TeacherService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {
    this.teacherForm = new FormGroup({
      id: new FormControl(''),
      teacherName: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required),
      designationId: new FormControl('', Validators.required),
      creditToBeTaken: new FormControl('', [
        Validators.min(10),
        Validators.max(50),
        Validators.required,
      ]),
      address: new FormControl(''),
      email: new FormControl('', Validators.email),
      contactNo: new FormControl('', [Validators.required, Validators.min(11)]),
    } as {
      [key in keyof TeacherDto]: FormControl;
    });
  }
  errorMessage = '';
  btnText = 'Add Teacher';
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.isAddMode = !this.id;
    this.getDepartment();
    this.getDesignation();
    if (!this.isAddMode) {
      this.btnText = 'Update Teacher';
      this.teacherService
        .getTeacherById(this.id)
        .pipe(first())
        .subscribe((x) => this.teacherForm.patchValue(x));
    }
  }

  get teacherName() {
    return this.teacherForm.get('teacherName');
  }
  get designationId() {
    return this.teacherForm.get('designationId');
  }
  get creditToBeTaken() {
    return this.teacherForm.get('creditToBeTaken');
  }
  get email() {
    return this.teacherForm.get('email');
  }
  get contactNo() {
    return this.teacherForm.get('contactNo');
  }
  get departmentId() {
    return this.teacherForm.get('departmentId');
  }

  onSubmit() {
    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.teacherForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.addTeacher();
    } else {
      this.updateTeacher();
    }
  }

  addTeacher() {
    if (this.teacherForm.valid) {
      let body = this.teacherForm.value;
      this.teacherService.addTeacher(body).subscribe({
        next: (data: any) => {
          this.toaster.success('Teacher Added Success');
          this.teacherForm.clearAsyncValidators;
          // this.reloadPage();
        },
        error: (err) => {
          this.errorMessage = err.error;
          this.toaster.error(this.errorMessage);
        },
      });
    } else {
      console.log(this.teacherForm);
    }
  }

  updateTeacher() {
    this.teacherService
      .updateTeacher(this.id, this.teacherForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toaster.success('Teacher Updated');

          this.router.navigate(['/teachers'], { relativeTo: this.route });
        },
        error: (error) => {
          this.loading = false;
          this.toaster.error(error);
          console.log(error);
        },
      });
  }

  getDesignation() {
    this.designationService.getAllDesignation().subscribe({
      next: (designation) => {
        this.designations = designation;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  getDepartment() {
    this.departmentService.getAllDepartment().subscribe({
      next: (departments) => {
        this.departments = departments;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
