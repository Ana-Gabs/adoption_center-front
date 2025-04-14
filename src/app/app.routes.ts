// ./app.routes.ts
import { Routes } from '@angular/router';
import { PetComponent } from './components/pet/pet.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'mascotas', component: PetComponent }

];
