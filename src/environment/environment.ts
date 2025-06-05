import { filter } from "rxjs";

export const environment = {
  production: false,
  apiUrls: {
    guide: {
      login: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/auth-functions/login',
      create: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/auth-functions/register',
      update: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/guides-api/update',
      updateImg: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/media-api/upload',
      topRated: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/guides-api/top-rated',
      detailGuide: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/guides-api/detail',
      listGuides: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/guides-api/list',
      activeReservation: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/reservations-api/active-guide',
      pastReservation: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/reservations-api/past-guide',
      summaryReservation: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/reservations-api/summary',
      filter: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/guides-api/filter',
    },
    tourist: {
      login: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/auth-functions/login',
      create: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/auth-functions/register',
      update: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/tourists-api/update',
      listTourists: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/tourists-api/list',
      activeReservation: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/reservations-api/active-tourist',
      pastReservation: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/reservations-api/past-tourist',
    },
    reservation: {
      recent: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/reservations-api/recent',
      process: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/reservations-api/process',
      listReservations: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/reservations-api/list',
      deleteReservation: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/reservations-api/delete',
      leaveReview: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/reservations-api/review',
      touristReviews: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/reservations-api/reviews?touristId=',
      guideReviews: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/reservations-api/reviews?guideId=',
      acceptReservation: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/reservations-api/accept',
    },
    transaction: {
      listTransactions: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/transactions-api/list',
    },
    language: {

    },
    hobbies: {

    },
    administrator: {
      login: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/auth-functions/login',
      kpis: 'https://spxagxhcvftjvnrcfely.supabase.co/functions/v1/admin-api/kpis'
    }
  }
};