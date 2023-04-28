import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCourseComponent } from './components/courses/add-edit-course/add-edit-course.component';
import { CourseAssignViewListComponent } from './components/courses/course-assign-view-list/course-assign-view-list.component';
import { CourseListComponent } from './components/courses/course-list/course-list.component';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
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
    path: 'employee',
    component: EmployeesListComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'employee/add',
    component: AddEmployeeComponent,
  },
  {
    path: 'student/add',
    component: AddStudentComponent,
  },
  {
    path: 'student',
    component: StudentListComponent,
  },
  {
    path: 'student/enroll',
    component: EnrollStudentComponent,
  },
  {
    path: 'student/result',
    component: ShowStudentResultComponent,
  },
  {
    path: 'student/result/add',
    component: AddStudentResultComponent,
  },

  { path: 'student/edit/:id', component: AddStudentComponent },
  {
    path: 'course/add',
    component: AddEditCourseComponent,
  },
  {
    path: 'course',
    component: CourseListComponent,
  },
  {
    path: 'course-view',
    component: CourseAssignViewListComponent,
  },
  { path: 'course/edit/:id', component: AddEditCourseComponent },
  { path: 'teachers', component: TeacherListComponent },
  { path: 'teacher/add', component: AddEditTeacherComponent },
  { path: 'teacher/edit/:id', component: AddEditTeacherComponent },
  { path: 'teacher/course-assign', component: CourseAssignTeacherComponent },
  {
    path: 'teacher/show-assign-teacher',
    component: ShowAssignTeacherComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
