'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { RoomType } from '@/types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    teacherName: string;
    subject?: string;
    classInfo?: string;
  }) => void;
  date: string;
  period: number;
  room: RoomType;
}

export default function ReservationModal({
  isOpen,
  onClose,
  onSubmit,
  date,
  period,
  room,
}: ReservationModalProps) {
  const [teacherName, setTeacherName] = useState('');
  const [subject, setSubject] = useState('');
  const [classInfo, setClassInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teacherName.trim()) {
      alert('성함을 입력해주세요.');
      return;
    }

    if (isSubmitting) return; // 중복 제출 방지

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        teacherName: teacherName.trim(),
        subject: subject.trim() || undefined,
        classInfo: classInfo.trim() || undefined,
      });

      // 성공 시 초기화 및 닫기
      setTeacherName('');
      setSubject('');
      setClassInfo('');
      onClose();
    } catch (error) {
      console.error('예약 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTeacherName('');
    setSubject('');
    setClassInfo('');
    onClose();
  };

  const headerBgColor = room === '물지실' ? 'bg-teal-600' : 'bg-purple-600';
  const buttonBgColor = room === '물지실' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-purple-600 hover:bg-purple-700';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-slideUp">
        {/* 헤더 */}
        <div className={`${headerBgColor} px-6 py-4 rounded-t-2xl flex items-center justify-between`}>
          <h2 className="text-xl font-bold text-white">예약하기</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            aria-label="닫기"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* 예약 정보 */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-gray-600">날짜:</span>
              <span className="ml-2 font-semibold">{date}</span>
            </div>
            <div>
              <span className="text-gray-600">교시:</span>
              <span className="ml-2 font-semibold">{period}교시</span>
            </div>
            <div>
              <span className="text-gray-600">과학실:</span>
              <span className="ml-2 font-semibold">{room}</span>
            </div>
          </div>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <div>
            <label htmlFor="teacherName" className="block text-sm font-semibold text-gray-700 mb-2">
              성함 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="teacherName"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="이름을 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
              과목 <span className="text-gray-400 text-xs font-normal">(선택)</span>
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="예: 물리, 화학, 생명과학"
            />
          </div>

          <div>
            <label htmlFor="classInfo" className="block text-sm font-semibold text-gray-700 mb-2">
              학반 <span className="text-gray-400 text-xs font-normal">(선택)</span>
            </label>
            <input
              type="text"
              id="classInfo"
              value={classInfo}
              onChange={(e) => setClassInfo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="예: 1학년 7반"
            />
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 active:scale-98 transition-all duration-200"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-4 py-3 ${buttonBgColor} text-white font-semibold rounded-lg active:scale-98 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? '예약 중...' : '예약하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

