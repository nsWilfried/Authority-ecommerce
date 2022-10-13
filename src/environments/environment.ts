// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'bricia-consulting',
    appId: '1:78864207095:web:8dfc964800f8ecb54897f2',
    databaseURL: 'https://bricia-consulting-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'bricia-consulting.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyCANnR3O1WqG2fwpylFPuemAEEo153jxkE',
    authDomain: 'bricia-consulting.firebaseapp.com',
    messagingSenderId: '78864207095',
    measurementId: 'G-P9RBC0MKGP',
  },
  production: false,
  stripeSecretKey:'sk_test_51Imr5SDTXvZFtH7OQuaKJsx1adAGgebmhO8K9TjQhG2TkhhAJTtMLitibUY0kXyBRf4iBnR55fZV0MBSFFSXwkgS00clrI8hLS',
  stripeTestKey: 'pk_test_51Imr5SDTXvZFtH7OAoRRGQSOXXvYHuOWNXM55XZX6L1s7ruTeFetl4LFwtS35CRxGpxUEsKwF4HnKu7rskB6Rqq400cGx5Z23z',
  //  firebaseConfig: {
  //   apiKey: "AIzaSyCANnR3O1WqG2fwpylFPuemAEEo153jxkE",
  //   authDomain: "bricia-consulting.firebaseapp.com",
  //   projectId: "bricia-consulting",
  //   storageBucket: "bricia-consulting.appspot.com",
  //   messagingSenderId: "78864207095",
  //   appId: "1:78864207095:web:8dfc964800f8ecb54897f2",
  //   measurementId: "G-P9RBC0MKGP"
  // },
  // origin: 'https://localhost/wordpress',
  origin: "https://dev-food-ecommerce.pantheonsite.io", 
  wcEndpoint: 'wp-json/wc/v3',
  eventEndpoint: "wp-json/tribe/events/v1/events",
  woocommerce: {
    // development 
    // consumer_key:  'ck_748d578ebb24681798653803c3a587b6c028a1a9',
    // consumer_secret: 'cs_68856efe0cb72ab5e7f61a7bd4792f07bbbfee16'

    // production 
    consumer_key: "ck_745ebb013bd2711e1d32d06f0e602fe6c93a3788", 
    consumer_secret : "cs_0598fe3c68bfcb543694d5db63e961d5f96f2a3e"
  }, 
  paygateKey: "7f7a46ca-7ad4-4366-ae3c-9b8041e3f018", 
  adminEmail: 'wilfriednsoukpoe1@gmail.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
