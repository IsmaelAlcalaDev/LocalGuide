import { PaymentType } from './paymentType.enum';
import { TransactionType } from './transactionType.enum';
import { Reservation } from './reservation.model';
import { Guide } from './guide.model';

export interface Transaction {
  amount: number;
  type: TransactionType;
  paymentType: PaymentType;
  transactionDate: Date;
  reservation: Reservation;
  guide?: Guide;
}