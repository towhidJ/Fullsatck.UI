import { Department } from './department.model';
import { Semester } from './semester.model';

export interface CourseDto {
  id: number;
  courseCode: string;
  courseName: string;
  credit: number;
  description: string | null;
  action: number | null;
  departmentId: number;
  semesterId: number;
}

export interface Course {
  id: number;
  courseCode: string;
  courseName: string;
  credit: number;
  description: string | null;
  action: number;
  departmentId: number;
  departmentTB: Department;
  semesterId: number;
  semester: Semester;
}

export interface CourseShowView {
  departmentCode: string;
  courseCode: string;
  teacherName: string;
  courseName: string;
}
