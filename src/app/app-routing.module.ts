import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClassScheduleComponent } from './components/class-room-allocate/add-class-schedule/add-class-schedule.component';
import { ShowClassScheduleComponent } from './components/class-room-allocate/show-class-schedule/show-class-schedule.component';
import { AddEditCourseComponent } from './components/courses/add-edit-course/add-edit-course.component';
import { CourseAssignViewListComponent } from './components/courses/course-assign-view-list/course-assign-view-list.component';
import { CourseListComponent } from './components/courses/course-list/course-list.component';
import { AddEditDepartmentComponent } from './components/departments/add-edit-department/add-edit-department.component';
import { DepartmentListComponent } from './components/departments/department-list/department-list.component';
import { HomeComponent } from './components/employees/home/home.component';
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
import { RoleGuard } from './shared/role.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'department/add',
    component: AddEditDepartmentComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'department/edit/:id',
    component: AddEditDepartmentComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'department',
    component: DepartmentListComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'student/add',
    component: AddStudentComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'student',
    component: StudentListComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'student/enroll',
    component: EnrollStudentComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'student/result',
    component: ShowStudentResultComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'student/result/add',
    component: AddStudentResultComponent,
    canActivate: [RoleGuard],
  },

  { path: 'student/edit/:id', component: AddStudentComponent },
  {
    path: 'course/add',
    component: AddEditCourseComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'course',
    component: CourseListComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'course-view',
    component: CourseAssignViewListComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'course/edit/:id',
    component: AddEditCourseComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'teachers',
    component: TeacherListComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'teacher/add',
    component: AddEditTeacherComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'teacher/edit/:id',
    component: AddEditTeacherComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'teacher/course-assign',
    component: CourseAssignTeacherComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'teacher/show-assign-teacher',
    component: ShowAssignTeacherComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'cra/add',
    component: AddClassScheduleComponent,
    canActivate: [RoleGuard],
  },

  {
    path: 'cra',
    component: ShowClassScheduleComponent,
    canActivate: [RoleGuard],
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
