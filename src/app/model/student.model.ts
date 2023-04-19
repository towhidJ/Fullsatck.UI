import { Department } from './department.model';

export interface StudentDto {
  id: number;
  studentName: string;
  email: string;
  contactNo: string;
  registerDate: Date;
  address: string;
  registrationNo: string;
  departmentId: number;
}

export interface Student {
  id: number;
  studentName: string;
  email: string | null;
  contactNo: string;
  registerDate: string;
  address: string;
  registrationNo: string;
  departmentId: number;
  departmentTB: Department;
}
