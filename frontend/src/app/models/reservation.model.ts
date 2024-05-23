import { ReservationStatus } from './reservationStatus.enum';

export interface Reservation {
  tourist: number;
  guide: number;
  reservationDate: Date;
  startDate: Date;
  endDate: Date;
  status: ReservationStatus;
  review?: string;
  reviewScore?: number;
  reservedHours: number;
  price: number;
}
