export interface ShowAssignView {
  id: number;
  departmentId: number;
  semesterId: number;
  semesterName: string;
  courseCode: string;
  teacherName: string;
  courseName: string;
  courseId: number;
}

export interface CourseAssignTeacherDto {
  id: number;
  departmentId: number | null;
  teacherId: number | null;
  courseId: number | null;
}
