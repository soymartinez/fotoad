// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//aqui se hace conexion a firebase 
export const environment = {
  production: false,
  baseUrl: 'http://localhost:4000/api',
  firebaseConfig: {
    apiKey: "AIzaSyCgUKjdh8NGofThPwjWHvHi1rWHF_m633Q",
    authDomain: "fotoad.firebaseapp.com",
    projectId: "fotoad",
    storageBucket: "fotoad.appspot.com",
    messagingSenderId: "379582661556",
    appId: "1:379582661556:web:011c44aedf36ee818368e1",
    measurementId: "G-HTT4RM7C6W"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
