import { filter } from "rxjs";

export const environment = {
  production: false,
  apiUrls: {
    guide: {
      login: 'https://xyzcompany.supabase.co/functions/v1/auth-functions/login',
      create: 'https://xyzcompany.supabase.co/functions/v1/auth-functions/register',
      update: 'https://xyzcompany.supabase.co/functions/v1/guides-api/update',
      updateImg: 'https://xyzcompany.supabase.co/functions/v1/media-api/upload',
      topRated: 'https://xyzcompany.supabase.co/functions/v1/guides-api/top-rated',
      detailGuide: 'https://xyzcompany.supabase.co/functions/v1/guides-api/detail',
      listGuides: 'https://xyzcompany.supabase.co/functions/v1/guides-api/list',
      activeReservation: 'https://xyzcompany.supabase.co/functions/v1/reservations-api/active-guide',
      pastReservation: 'https://xyzcompany.supabase.co/functions/v1/reservations-api/past-guide',
      summaryReservation: 'https://xyzcompany.supabase.co/functions/v1/reservations-api/summary',
      filter: 'https://xyzcompany.supabase.co/functions/v1/guides-api/filter',
    },
    tourist: {
      login: 'https://xyzcompany.supabase.co/functions/v1/auth-functions/login',
      create: 'https://xyzcompany.supabase.co/functions/v1/auth-functions/register',
      update: 'https://xyzcompany.supabase.co/functions/v1/tourists-api/update',
      listTourists: 'https://xyzcompany.supabase.co/functions/v1/tourists-api/list',
      activeReservation: 'https://xyzcompany.supabase.co/functions/v1/reservations-api/active-tourist',
      pastReservation: 'https://xyzcompany.supabase.co/functions/v1/reservations-api/past-tourist',
    },
    reservation: {
      recent: 'https://xyzcompany.supabase.co/functions/v1/reservations-api/recent',
      process: 'https://xyzcompany.supabase.co/functions/v1/reservations-api/process',
      listReservations: 'https://xyzcompany.supabase.co/functions/v1/reservations-api/list',
      deleteReservation: 'https://xyzcompany.supabase.co/functions/v1/reservations-api/delete',
      leaveReview: 'https://xyzcompany.supabase.co/functions/v1/reservations-api/review',
      touristReviews: 'https://xyzcompany.supabase.co/functions/v1/reservations-api/reviews?touristId=',
      guideReviews: 'https://xyzcompany.supabase.co/functions/v1/reservations-api/reviews?guideId=',
      acceptReservation: 'https://xyzcompany.supabase.co/functions/v1/reservations-api/accept',
    },
    transaction: {
      listTransactions: 'https://xyzcompany.supabase.co/functions/v1/transactions-api/list',
    },
    language: {

    },
    hobbies: {

    },
    administrator: {
      login: 'https://xyzcompany.supabase.co/functions/v1/auth-functions/login',
      kpis: 'https://xyzcompany.supabase.co/functions/v1/admin-api/kpis'
    }
  }
};