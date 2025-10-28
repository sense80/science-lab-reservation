'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TimeTable from '@/components/TimeTable';
import ReservationModal from '@/components/ReservationModal';
import { Reservation, RoomType } from '@/types';
import {
  getSeoulDate,
  getWeekStart,
  getWeekDays,
  getPreviousWeek,
  getNextWeek,
  formatDateToString,
  getDayOfWeek,
} from '@/lib/utils';
import {
  createReservation,
  deleteReservation,
  subscribeToReservations,
  checkReservationExists,
} from '@/lib/firestore';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getWeekStart(getSeoulDate()));
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    period: number;
    room: RoomType;
  } | null>(null);

  // 주의 날짜 계산
  useEffect(() => {
    const days = getWeekDays(currentWeekStart);
    setWeekDays(days);
  }, [currentWeekStart]);

  // 예약 데이터 실시간 구독
  useEffect(() => {
    if (weekDays.length === 0) return;

    const startDate = formatDateToString(weekDays[0]);
    const endDate = formatDateToString(weekDays[weekDays.length - 1]);

    setLoading(true);
    const unsubscribe = subscribeToReservations(startDate, endDate, (data) => {
      setReservations(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [weekDays]);

  // 이전 주로 이동
  const handlePreviousWeek = () => {
    setCurrentWeekStart(getPreviousWeek(currentWeekStart));
  };

  // 다음 주로 이동
  const handleNextWeek = () => {
    setCurrentWeekStart(getNextWeek(currentWeekStart));
  };

  // 셀 클릭 핸들러
  const handleCellClick = (date: string, period: number, room: RoomType) => {
    setSelectedSlot({ date, period, room });
    setIsModalOpen(true);
  };

  // 예약 생성 핸들러
  const handleCreateReservation = async (data: {
    teacherName: string;
    subject?: string;
    classInfo?: string;
  }) => {
    if (!selectedSlot) return;

    // 중복 예약 확인
    const exists = await checkReservationExists(
      selectedSlot.date,
      selectedSlot.period,
      selectedSlot.room
    );

    if (exists) {
      alert('이미 예약된 시간입니다.');
      return;
    }

    const dateObj = new Date(selectedSlot.date);
    const dayOfWeek = getDayOfWeek(dateObj);

    const result = await createReservation({
      date: selectedSlot.date,
      dayOfWeek,
      period: selectedSlot.period,
      room: selectedSlot.room,
      teacherName: data.teacherName,
      subject: data.subject,
      classInfo: data.classInfo,
    });

    if (result.success) {
      setIsModalOpen(false);
      setSelectedSlot(null);
    } else {
      alert('예약 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 예약 삭제 핸들러
  const handleDeleteReservation = async (id: string) => {
    const result = await deleteReservation(id);
    
    if (!result.success) {
      alert('예약 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen">
      <Header
        currentDate={currentWeekStart}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* 물지실 시간표 */}
            <TimeTable
              room="물지실"
              weekDays={weekDays}
              reservations={reservations}
              onCellClick={handleCellClick}
              onDeleteReservation={handleDeleteReservation}
            />

            {/* 화생실 시간표 */}
            <TimeTable
              room="화생실"
              weekDays={weekDays}
              reservations={reservations}
              onCellClick={handleCellClick}
              onDeleteReservation={handleDeleteReservation}
            />
          </div>
        )}
      </main>

      {/* 예약 모달 */}
      {selectedSlot && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSlot(null);
          }}
          onSubmit={handleCreateReservation}
          date={selectedSlot.date}
          period={selectedSlot.period}
          room={selectedSlot.room}
        />
      )}
    </div>
  );
}

