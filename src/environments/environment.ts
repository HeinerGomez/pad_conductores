// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // URL_API: 'https://dev.intrared.net:9443/pad_backend/api',
  // URL_STORAGE: 'https://dev.intrared.net:9443/pad_backend/storage/'
  URL_STORAGE: 'https://logitech.intrared.net/ap/pad/v2/backend/storage/',
  URL_API: 'https://logitech.intrared.net/ap/pad/v2/backend/api',
  APP_ID_ONE_SIGNAL: '2e061205-2c57-4e4f-a48c-3c658da95e23',
  SENDER_ID: '387410221556',
  ANDROID_ID: '1:387410221556:android:776431ba54a9b13c9e81a1',
  SCA_URL: 'https://logitech.intrared.net/ap/sca/v1/backend/api/v1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
