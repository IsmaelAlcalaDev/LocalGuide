import { PaymentType } from './paymentType.enum';
import { TransactionType } from './transactionType.enum';
import { Reservation } from './reservation.model';
import { Guide } from './guide.model';

export interface Transaction {
  id: number;
  amount: number;
  type: TransactionType;
  paymentType: PaymentType;
  transactionDate: string;
  reservation: Reservation;
  guide?: Guide;
}