import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { HomeComponent } from './components/employees/home/home.component';
import { AddStudentComponent } from './components/students/add-student/add-student.component';
import { StudentListComponent } from './components/students/student-list/student-list.component';
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

  { path: 'student/edit/:id', component: AddStudentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
