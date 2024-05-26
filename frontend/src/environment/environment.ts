export const environment = {
    production: false,
    apiUrls: {
      guide: {
        login: 'http://localhost:8080/local-guide/api/guide/v1/login',
        create: 'http://localhost:8080/local-guide/api/guide/v1/create',
        update: 'http://localhost:8080/local-guide/api/guide/v1/update',
        updateImg: 'http://localhost:8080/local-guide/api/media/v1/images/upload',
        topRated: 'http://localhost:8080/local-guide/api/guide/v1/top-rated',
        detailGuide: 'http://localhost:8080/local-guide/api/guide/v1/detail',
        listGuides: 'http://localhost:8080/local-guide/api/guide/v1/listGuides',
      },
      tourist: {
        login: 'http://localhost:8080/local-guide/api/tourist/v1/login',
        create: 'http://localhost:8080/local-guide/api/tourist/v1/create',
        update: 'http://localhost:8080/local-guide/api/tourist/v1/update',
        listTourists: 'http://localhost:8080/local-guide/api/tourist/v1/listTourists'
      },
      reservation: {
        recent: 'http://localhost:8080/local-guide/api/reservation/v1/recent',
        process: 'http://localhost:8080/local-guide/api/reservation/v1/process',
        listReservations: 'http://localhost:8080/local-guide/api/reservation/v1/listReservations'
      },
      transaction: {
        listTransactions: 'http://localhost:8080/local-guide/api/transactions/v1/listTransactions',
      },
      language: {

      },
      hobbies: {

      },
      administrator: {
        login: 'http://localhost:8080/local-guide/api/admin/v1/login',
        kpis: 'http://localhost:8080/local-guide/api/admin/v1/kpis'
      }
    }
  };
  