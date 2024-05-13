import { Tourist } from './tourist.model';
import { Guide } from './guide.model';
import { ReservationStatus } from './reservationStatus.enum';

export interface Reservation {
  id: number;
  tourist: Tourist;
  guide: Guide;
  reservationDate: Date;
  startDate: Date;
  endDate?: Date;
  status: ReservationStatus;
  review?: string;
  reviewScore?: number;
  reservedHours: number;
  price: number;
}
