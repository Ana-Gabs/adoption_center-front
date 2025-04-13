import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

// Reducers
import { petReducer } from './store/Pet.Reducer';

// Effects
import { PetEffects } from './store/Pet.Effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideToastr(),
    provideStore({
      pet: petReducer,


    }),
    provideEffects([
      PetEffects,


    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
