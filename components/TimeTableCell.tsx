'use client';

import React from 'react';
import { X } from 'lucide-react';
import { RoomType, Reservation } from '@/types';
import { formatReservedTime } from '@/lib/utils';

interface TimeTableCellProps {
  date: string;
  period: number;
  room: RoomType;
  reservation?: Reservation;
  onCellClick: (date: string, period: number, room: RoomType) => void;
  onDeleteReservation: (id: string) => void;
}

const TimeTableCell = ({
  date,
  period,
  room,
  reservation,
  onCellClick,
  onDeleteReservation,
}: TimeTableCellProps) => {
  const handleClick = () => {
    if (!reservation) {
      onCellClick(date, period, room);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (reservation && window.confirm('정말 삭제하시겠습니까?')) {
      onDeleteReservation(reservation.id);
    }
  };

  if (reservation) {
    return (
      <td
        className="border border-gray-300 p-2 relative group cursor-default bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-200"
      >
        <div className="text-xs space-y-1">
          <div className="font-bold text-blue-900">{reservation.teacherName}</div>
          {reservation.subject && (
            <div className="text-blue-700">{reservation.subject}</div>
          )}
          {reservation.classInfo && (
            <div className="text-blue-600">{reservation.classInfo}</div>
          )}
          <div className="text-blue-500 text-[10px] mt-1">
            {formatReservedTime(reservation.reservedAt)} 예약
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 active:scale-90 transition-all duration-200 shadow-lg"
          aria-label="예약 삭제"
        >
          <X className="w-3 h-3" />
        </button>
      </td>
    );
  }

  return (
    <td
      onClick={handleClick}
      className="border border-gray-300 p-2 h-24 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150"
    >
      <div className="h-full flex items-center justify-center text-gray-400 text-xs">
        클릭하여 예약
      </div>
    </td>
  );
};

export default React.memo(TimeTableCell);

