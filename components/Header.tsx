'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface HeaderProps {
  currentDate: Date;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

export default function Header({ currentDate, onPreviousWeek, onNextWeek }: HeaderProps) {
  const formattedDate = formatDate(currentDate, 'yyyy년 M월 d일 (EEEE)');

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6">
          대전관저고 과학실 예약시스템
        </h1>
        
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onPreviousWeek}
            className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-all duration-200"
            aria-label="이전 주"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <div className="min-w-[280px] text-center">
            <p className="text-lg sm:text-xl font-semibold text-gray-800">
              {formattedDate}
            </p>
          </div>
          
          <button
            onClick={onNextWeek}
            className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-all duration-200"
            aria-label="다음 주"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}

