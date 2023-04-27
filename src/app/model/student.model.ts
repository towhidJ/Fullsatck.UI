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

export interface EnrollCourseDto {
  id: number;
  date: Date;
  studentId: number;
  courseId: number;
}

export interface StudentResultDto {
  id: number;
  studentId: number;
  courseId: number;
  gradeLetterId: number;
}

export interface StudentResultView {
  courseCode: string;
  courseName: string;
  credit: number;
  grade: string;
}

export interface StudentView {
  studentId: number;
  studentName?: string;
  email?: string;
  departmentId?: number;
  departmentName?: string;
  courseId?: number;
  courseName?: string;
  registrationNo?: string;
}
