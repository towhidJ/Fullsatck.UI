import { Department } from './department.model';
import { Designation } from './designation.model';

export interface Teacher {
  id: number;
  teacherName: string;
  address: string | null;
  email: string | null;
  contactNo: string;
  creditToBeTaken: number;
  remainingCredit: number;
  departmentId: number;
  department: Department;
  designationId: number;
  designation: Designation;
}
