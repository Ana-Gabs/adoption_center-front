// ./app.config.ts
import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withFetch } from '@angular/common/http';  // Asegúrate de importar withFetch aquí
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

// Reducers
import { petReducer } from './store/Pet.Reducer';
import { userReducer } from './store/User.Reducer';

// Effects
import { PetEffects } from './store/Pet.Effects';
import { UserEffects } from './store/User.Effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideToastr(),
    provideAnimations(),
    provideStore({
      pet: petReducer,
      user: userReducer,
    }),
    provideEffects([
      PetEffects,
      UserEffects,
    ]

  ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ],
};
