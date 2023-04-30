export interface ClassScheduleViewModel {
  id: number;
  departmentId: number;
  courseId: number;
  courseCode: string;
  courseName: string;
  roomNo: string;
  dayName: string;
  fromTime: string;
  toTime: string;
  schedule: string;
}

export interface AllocateClassDto {
  id: number;
  fromTime: string;
  toTime: string;
  departmentId: number;
  courseId: number;
  roomId: number;
  dayId: number;
  action: boolean | true;
}
