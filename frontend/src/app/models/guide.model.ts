import { Language } from './language.model';
import { Hobbies } from './hobbies.model';
import { Reservation } from './reservation.model';
import { Gender } from './gender.enum';

export interface Guide {
  id?: number;
  name: string;
  surname: string;
  country: string;
  city: string;
  gender: Gender;
  phone?: string;
  email: string;
  password: string;
  hourlyPrice?: number;
  additionalInfo?: string;
  phrase?: string;
  contractedPlanName?: string;
  contractedPlanDuration?: number;
  contractedPlanPrice?: number;
  planStartDate?: Date;
  planExpirationDate?: Date;
  languages?: Language[];
  hobbies?: Hobbies[];
  reservations?: Reservation[];
  backgroundCheckCertificate?: boolean;
  identityDocument?: boolean;
  profileImg?: string;
  typeUser?: string;
}

