import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Reservation } from '@/types';

const COLLECTION_NAME = 'reservations';

// 예약 생성
export async function createReservation(reservation: Omit<Reservation, 'id' | 'reservedAt'>) {
  try {
    // undefined 필드 제거 (Firestore는 undefined를 허용하지 않음)
    const reservationData: any = {
      date: reservation.date,
      dayOfWeek: reservation.dayOfWeek,
      period: reservation.period,
      room: reservation.room,
      teacherName: reservation.teacherName,
      reservedAt: new Date().toISOString(),
    };
    
    // 선택 필드는 값이 있을 때만 추가
    if (reservation.subject) {
      reservationData.subject = reservation.subject;
    }
    if (reservation.classInfo) {
      reservationData.classInfo = reservation.classInfo;
    }
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), reservationData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating reservation:', error);
    return { success: false, error };
  }
}

// 예약 삭제
export async function deleteReservation(id: string) {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return { success: false, error };
  }
}

// 특정 날짜 범위의 예약 조회
export async function getReservationsByDateRange(startDate: string, endDate: string) {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('date', '>=', startDate),
      where('date', '<=', endDate)
    );
    
    const querySnapshot = await getDocs(q);
    const reservations: Reservation[] = [];
    
    querySnapshot.forEach((doc) => {
      reservations.push({
        id: doc.id,
        ...doc.data(),
      } as Reservation);
    });
    
    return reservations;
  } catch (error) {
    console.error('Error getting reservations:', error);
    return [];
  }
}

// 실시간 예약 구독
export function subscribeToReservations(
  startDate: string,
  endDate: string,
  callback: (reservations: Reservation[]) => void
) {
  // 모든 예약을 가져옴 (과학실 예약은 데이터가 많지 않음)
  const q = query(collection(db, COLLECTION_NAME));
  
  return onSnapshot(
    q,
    (querySnapshot) => {
      const reservations: Reservation[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        reservations.push({
          id: doc.id,
          ...data,
        } as Reservation);
      });
      
      console.log('📊 예약 데이터 로드됨:', reservations.length, '개');
      callback(reservations);
    },
    (error) => {
      console.error('❌ 예약 데이터 구독 에러:', error);
      // 에러 발생 시 빈 배열 반환
      callback([]);
    }
  );
}

// 특정 시간대 예약 확인
export async function checkReservationExists(
  date: string,
  period: number,
  room: string
): Promise<boolean> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('date', '==', date),
      where('period', '==', period),
      where('room', '==', room)
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking reservation:', error);
    return false;
  }
}

