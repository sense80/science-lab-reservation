export type RoomType = '물지실' | '화생실';

export interface Reservation {
  id: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: string; // 월, 화, 수, 목, 금
  period: number; // 1-7
  room: RoomType;
  teacherName: string;
  subject?: string; // 선택사항
  classInfo?: string; // 선택사항 (예: 1학년 7반)
  reservedAt: string; // ISO 8601 timestamp
}

export interface TimeSlot {
  date: string;
  dayOfWeek: string;
  period: number;
  room: RoomType;
}

