// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "",
    authDomain: "pizzaria-nr-angular.firebaseapp.com",
    databaseURL: "https://pizzaria-nr-angular-default-rtdb.firebaseio.com",
    projectId: "pizzaria-nr-angular",
    storageBucket: "pizzaria-nr-angular.firebasestorage.app",
    messagingSenderId: "308914607422",
    appId: "1:308914607422:web:7de6a26eae6a1f2da7486f",
    measurementId: "G-SME366CR2J"
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
