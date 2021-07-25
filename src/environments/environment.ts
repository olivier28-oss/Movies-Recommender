// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAw3zD6aAWGZ0TyWxDkTElIf1pU_wX2raM",
    authDomain: "recommended-system.firebaseapp.com",
    projectId: "recommended-system",
    storageBucket: "recommended-system.appspot.com",
    messagingSenderId: "143110239954",
    appId: "1:143110239954:web:4789210fc977ec91105f0b",
    measurementId: "G-HP2G2JE3D1"
  }

  /**
   *
   * <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAw3zD6aAWGZ0TyWxDkTElIf1pU_wX2raM",
    authDomain: "recommended-system.firebaseapp.com",
    projectId: "recommended-system",
    storageBucket: "recommended-system.appspot.com",
    messagingSenderId: "143110239954",
    appId: "1:143110239954:web:4789210fc977ec91105f0b",
    measurementId: "G-HP2G2JE3D1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
   */



};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
