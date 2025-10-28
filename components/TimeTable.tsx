'use client';

import React from 'react';
import { RoomType, Reservation } from '@/types';
import { formatDateToString, getDayOfWeek, PERIODS } from '@/lib/utils';
import TimeTableCell from './TimeTableCell';

interface TimeTableProps {
  room: RoomType;
  weekDays: Date[];
  reservations: Reservation[];
  onCellClick: (date: string, period: number, room: RoomType) => void;
  onDeleteReservation: (id: string) => void;
}

const TimeTable = ({
  room,
  weekDays,
  reservations,
  onCellClick,
  onDeleteReservation,
}: TimeTableProps) => {
  // 특정 날짜, 교시, 과학실에 해당하는 예약 찾기
  const findReservation = (date: string, period: number): Reservation | undefined => {
    return reservations.find(
      (r) => r.date === date && r.period === period && r.room === room
    );
  };

  const roomColors = {
    물지실: {
      bg: 'bg-teal-50',
      header: 'bg-teal-600',
      text: 'text-teal-900',
    },
    화생실: {
      bg: 'bg-purple-50',
      header: 'bg-purple-600',
      text: 'text-purple-900',
    },
  };

  const colors = roomColors[room];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* 과학실 제목 */}
      <div className={`${colors.header} px-6 py-4`}>
        <h2 className="text-2xl font-bold text-white text-center">{room}</h2>
      </div>

      {/* 시간표 그리드 */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className={colors.bg}>
              <th className="border border-gray-300 px-4 py-3 font-semibold text-gray-700 w-20">
                교시
              </th>
              {weekDays.map((day) => (
                <th
                  key={day.toISOString()}
                  className="border border-gray-300 px-2 py-3 font-semibold text-gray-700"
                >
                  <div className="text-center">
                    <div className="text-sm">{getDayOfWeek(day)}요일</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {day.getMonth() + 1}/{day.getDate()}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERIODS.map((period) => (
              <tr key={period}>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-700 bg-gray-50">
                  {period}교시
                </td>
                {weekDays.map((day) => {
                  const dateStr = formatDateToString(day);
                  const reservation = findReservation(dateStr, period);
                  
                  return (
                    <TimeTableCell
                      key={`${dateStr}-${period}`}
                      date={dateStr}
                      period={period}
                      room={room}
                      reservation={reservation}
                      onCellClick={onCellClick}
                      onDeleteReservation={onDeleteReservation}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(TimeTable);

