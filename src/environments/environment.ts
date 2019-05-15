// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyCRA-ap5YTuCP20P7FQzxL4oh8CC9dsp6A",
    authDomain: "angularshop-4e6b0.firebaseapp.com",
    databaseURL: "https://angularshop-4e6b0.firebaseio.com",
    projectId: "angularshop-4e6b0",
    storageBucket: "angularshop-4e6b0.appspot.com",
    messagingSenderId: "540386600560"
  },
  // Register for Stripe Developer Account and get the key
  stripeKey: 'Your Stripe Key'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
