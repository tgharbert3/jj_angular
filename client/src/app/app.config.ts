import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { routes } from './app.routes';
import { firebaseConfig } from './enviroments/firebaseConfig';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideStorage(() => getStorage()),
  provideAuth(() => getAuth()),
  ],

};
