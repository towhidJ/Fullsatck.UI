import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllocateClassDto } from 'src/app/model/class-schedule.model';
import { Course } from 'src/app/model/course.model';
import { Day } from 'src/app/model/day.model';
import { Department } from 'src/app/model/department.model';
import { Room } from 'src/app/model/room.model';
import { DaysService } from 'src/services/days.service';
import { DepartmentService } from 'src/services/department.service';
import { RoomService } from 'src/services/room.service';
import { StudentService } from 'src/services/student.service';
import { ClassScheduleService } from './../../../../services/class-schedule.service';

@Component({
  selector: 'app-add-class-schedule',
  templateUrl: './add-class-schedule.component.html',
  styleUrls: ['./add-class-schedule.component.css'],
})
export class AddClassScheduleComponent implements OnInit {
  departments: Department[] = [];
  courses: Course[] = [];
  days: Day[] = [];
  rooms: Room[] = [];
  errorMessage?: string;
  classScheduleForm: FormGroup;
  constructor(
    private departmentService: DepartmentService,
    private studentService: StudentService,
    private roomService: RoomService,
    private dayService: DaysService,
    private classScheduleService: ClassScheduleService,
    private toaster: ToastrService,
    route: Router
  ) {
    this.classScheduleForm = new FormGroup({
      id: new FormControl(''),
      departmentId: new FormControl('', Validators.required),
      roomId: new FormControl('', Validators.required),
      courseId: new FormControl('', Validators.required),
      fromTime: new FormControl('', Validators.required),
      toTime: new FormControl('', Validators.required),
      dayId: new FormControl('', Validators.required),
    } as {
      [key in keyof AllocateClassDto]: FormControl;
    });
  }
  ngOnInit(): void {
    this.getDepartment();
    this.getAllDays();
    this.getAllRoomNo();
  }

  get departmentId() {
    return this.classScheduleForm.get('departmentId');
  }
  get roomId() {
    return this.classScheduleForm.get('roomId');
  }
  get courseId() {
    return this.classScheduleForm.get('courseId');
  }
  get dayId() {
    return this.classScheduleForm.get('dayId');
  }
  get fromTime() {
    return this.classScheduleForm.get('fromTime');
  }
  get toTime() {
    return this.classScheduleForm.get('toTime');
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
    this.getCourseByDepartmentId(depId);
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
  getAllDays() {
    this.dayService.getAllDays().subscribe({
      next: (day) => {
        this.days = day;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  getAllRoomNo() {
    this.roomService.getAllRoomNo().subscribe({
      next: (room) => {
        this.rooms = room;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  onSubmit() {
    this.assignClass();
  }

  assignClass() {
    if (this.classScheduleForm.valid) {
      let body = this.classScheduleForm.value;
      this.classScheduleService.addSchedule(body).subscribe({
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
      console.log(this.classScheduleForm);
    }
  }
}
