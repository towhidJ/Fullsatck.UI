import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptorService } from 'src/services/token-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddClassScheduleComponent } from './components/class-room-allocate/add-class-schedule/add-class-schedule.component';
import { ShowClassScheduleComponent } from './components/class-room-allocate/show-class-schedule/show-class-schedule.component';
import { AddEditCourseComponent } from './components/courses/add-edit-course/add-edit-course.component';
import { CourseAssignViewListComponent } from './components/courses/course-assign-view-list/course-assign-view-list.component';
import { CourseListComponent } from './components/courses/course-list/course-list.component';
import { AddEditDepartmentComponent } from './components/departments/add-edit-department/add-edit-department.component';
import { DepartmentListComponent } from './components/departments/department-list/department-list.component';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { HomeComponent } from './components/employees/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { AddStudentResultComponent } from './components/students/add-student-result/add-student-result.component';
import { AddStudentComponent } from './components/students/add-student/add-student.component';
import { EnrollStudentComponent } from './components/students/enroll-student/enroll-student.component';
import { ShowStudentResultComponent } from './components/students/show-student-result/show-student-result.component';
import { StudentListComponent } from './components/students/student-list/student-list.component';
import { AddEditTeacherComponent } from './components/teachers/add-edit-teacher/add-edit-teacher.component';
import { CourseAssignTeacherComponent } from './components/teachers/course-assign-teacher/course-assign-teacher.component';
import { ShowAssignTeacherComponent } from './components/teachers/show-assign-teacher/show-assign-teacher.component';
import { TeacherListComponent } from './components/teachers/teacher-list/teacher-list.component';
import { LoginComponent } from './components/user/login/login.component';
import { UserComponent } from './components/user/user.component';
import { NewLinePipePipe } from './new-line-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    AddEmployeeComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    AddStudentComponent,
    StudentListComponent,
    FooterComponent,
    HeaderComponent,
    CourseListComponent,
    AddEditCourseComponent,
    CourseAssignTeacherComponent,
    CourseAssignViewListComponent,
    TeacherListComponent,
    AddEditTeacherComponent,
    EnrollStudentComponent,
    AddStudentResultComponent,
    ShowStudentResultComponent,
    ShowAssignTeacherComponent,
    DepartmentListComponent,
    AddEditDepartmentComponent,
    AddClassScheduleComponent,
    ShowClassScheduleComponent,
    NewLinePipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
