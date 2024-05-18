export const environment = {
    production: false,
    apiUrls: {
      guide: {
        login: 'http://localhost:8080/local-guide/api/guide/v1/login',
        create: 'http://localhost:8080/local-guide/api/guide/v1/create',
        update: 'http://localhost:8080/local-guide/api/guide/v1/update',
        updateImg: 'http://localhost:8080/local-guide/api/media/v1/images/upload',
      },
      tourist: {
        login: 'http://localhost:8080/local-guide/api/tourist/v1/login',
        create: 'http://localhost:8080/local-guide/api/tourist/v1/create',
        update: 'http://localhost:8080/local-guide/api/tourist/v1/update',
      },
      reservation: {
        recent: 'http://localhost:8080/local-guide/api/reservation/v1/recent',
      },
      transaction: {

      },
      language: {

      },
      hobbies: {

      },
      administrator: {

      }
    }
  };
  