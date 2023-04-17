import { Component, OnInit } from '@angular/core';
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
import { StudentDto } from 'src/app/model/student.model';
import { DepartmentService } from './../../../../services/department.service';
import { StudentService } from './../../../../services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  departments: Department[] = [];
  studentForm: FormGroup;
  id: number = 0;
  isAddMode: boolean = true;
  loading = false;
  submitted = true;
  enbDis = 'enable';

  constructor(
    private departmentService: DepartmentService,
    private studentService: StudentService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {
    this.studentForm = new FormGroup({
      id: new FormControl(''),
      studentName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      contactNo: new FormControl('', Validators.required),
      registerDate: new FormControl<Date | null>(null, Validators.required),
      registrationNo: new FormControl('ok'),
      address: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required),
    } as {
      [key in keyof StudentDto]: FormControl;
    });
  }
  errorMessage = '';
  btnText = 'Add Student';
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.isAddMode = !this.id;

    this.departmentService.getAllDepartment().subscribe({
      next: (departments) => {
        this.departments = departments;
        console.log(departments);
      },
      error: (response) => {
        console.log(response);
      },
    });

    if (!this.isAddMode) {
      this.btnText = 'Update Student';
      this.enbDis = 'disable';
      this.studentService
        .getStudentById(this.id)
        .pipe(first())
        .subscribe((x) => this.studentForm.patchValue(x));
    }
  }

  get studentName() {
    return this.studentForm.get('studentName');
  }
  get contactNo() {
    return this.studentForm.get('contactNo');
  }
  get registerDate() {
    return this.studentForm.get('registerDate');
  }
  get departmentId() {
    return this.studentForm.get('departmentId');
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.studentForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.addStudent();
    } else {
      this.updateStudent();
    }
  }

  addStudent() {
    if (this.studentForm.valid) {
      let body = this.studentForm.value;
      this.studentService.addStudent(body).subscribe({
        next: (data: any) => {
          this.toaster.success('Student Added Success');
          // this.reloadPage();
        },
        error: (err) => {
          this.errorMessage = err.error;
          this.toaster.error(this.errorMessage);
        },
      });
    } else {
      console.log(this.studentForm);
    }
  }

  updateStudent() {
    this.studentService
      .updateStudent(this.id, this.studentForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toaster.success('Student Updated', 'Update Student');

          this.router.navigate(['/student'], { relativeTo: this.route });
        },
        error: (error) => {
          this.loading = false;
          this.toaster.error(error);
        },
      });
  }
  toastS() {}
}
