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
import { CourseDto } from 'src/app/model/course.model';
import { Department } from 'src/app/model/department.model';
import { Semester } from 'src/app/model/semester.model';
import { CourseService } from 'src/services/course.service';
import { DepartmentService } from 'src/services/department.service';
import { SemesterService } from './../../../../services/semester.service';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css'],
})
export class AddEditCourseComponent {
  departments: Department[] = [];
  semesters: Semester[] = [];
  courseForm: FormGroup;
  id: number = 0;
  isAddMode: boolean = true;
  loading = false;

  constructor(
    private departmentService: DepartmentService,
    private semesterService: SemesterService,
    private courseService: CourseService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {
    this.courseForm = new FormGroup({
      id: new FormControl(''),
      courseCode: new FormControl('', Validators.required),
      courseName: new FormControl('', Validators.required),
      credit: new FormControl('', [
        Validators.min(0.5),
        Validators.max(5),
        Validators.required,
      ]),
      description: new FormControl(''),
      action: new FormControl('1', Validators.required),
      departmentId: new FormControl('', Validators.required),
      semesterId: new FormControl('', Validators.required),
    } as {
      [key in keyof CourseDto]: FormControl;
    });
  }
  errorMessage = '';
  btnText = 'Add Course';
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.isAddMode = !this.id;
    this.getDepartment();
    this.getSemester();
    if (!this.isAddMode) {
      this.btnText = 'Update Course';
      this.courseService
        .getCourseById(this.id)
        .pipe(first())
        .subscribe((x) => this.courseForm.patchValue(x));
    }
  }

  get courseName() {
    return this.courseForm.get('courseName');
  }
  get courseCode() {
    return this.courseForm.get('courseCode');
  }
  get credit() {
    return this.courseForm.get('credit');
  }
  get semesterId() {
    return this.courseForm.get('semesterId');
  }
  get departmentId() {
    return this.courseForm.get('departmentId');
  }

  onSubmit() {
    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.courseForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.addCourse();
    } else {
      this.updateCourse();
    }
  }

  addCourse() {
    if (this.courseForm.valid) {
      let body = this.courseForm.value;
      this.courseService.addCourse(body).subscribe({
        next: (data: any) => {
          this.toaster.success('Course Added Success');
          // this.reloadPage();
        },
        error: (err) => {
          this.errorMessage = err.error;
          console.log(this.errorMessage);
          this.toaster.error(this.errorMessage);
        },
      });
    } else {
      console.log(this.courseForm);
    }
  }

  updateCourse() {
    this.courseService
      .updateCourse(this.id, this.courseForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toaster.success('Course Updated', 'Course Student');

          this.router.navigate(['/course'], { relativeTo: this.route });
        },
        error: (error) => {
          this.loading = false;
          this.toaster.error(error.error);
          console.log(error);
        },
      });
  }

  getSemester() {
    this.semesterService.getAllDepartment().subscribe({
      next: (semester) => {
        this.semesters = semester;
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
