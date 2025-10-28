import { format, startOfWeek, addDays, addWeeks, subWeeks } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

// 서울 시간대로 현재 날짜 가져오기
export function getSeoulDate(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
}

// 주의 시작일(월요일) 가져오기
export function getWeekStart(date: Date): Date {
  return startOfWeek(date, { weekStartsOn: 1 }); // 1 = Monday
}

// 주의 날짜 배열 생성 (월~금)
export function getWeekDays(startDate: Date): Date[] {
  return Array.from({ length: 5 }, (_, i) => addDays(startDate, i));
}

// 날짜 포맷팅
export function formatDate(date: Date, formatStr: string): string {
  return format(date, formatStr, { locale: ko });
}

// 날짜를 YYYY-MM-DD 형식으로 변환
export function formatDateToString(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

// 요일 가져오기
export function getDayOfWeek(date: Date): string {
  return format(date, 'EEEE', { locale: ko }).charAt(0); // 월, 화, 수, 목, 금
}

// 이전 주로 이동
export function getPreviousWeek(date: Date): Date {
  return subWeeks(date, 1);
}

// 다음 주로 이동
export function getNextWeek(date: Date): Date {
  return addWeeks(date, 1);
}

// 예약 시간 포맷팅
export function formatReservedTime(isoString: string): string {
  const date = new Date(isoString);
  return format(date, 'M/d HH:mm', { locale: ko });
}

// 교시 배열
export const PERIODS = [1, 2, 3, 4, 5, 6, 7];

// 과학실 목록
export const ROOMS = ['물지실', '화생실'] as const;

