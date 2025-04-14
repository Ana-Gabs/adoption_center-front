// src/app/store/Pet.Effects.ts
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { PetService } from '../services/pet.service';
import {
  loadPets,
  loadPetsSuccess,
  loadPetsFailure,
  deletePet,
  deletePetSuccess,
  deletePetFailure,
  addPet,
  addPetSuccess,
  addPetFailure,
  updatePet,
  updatePetSuccess,
  updatePetFailure,
  emptyAction
} from './Pet.Action';

import { catchError, map, switchMap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class PetEffects {
  actions$ = inject(Actions);
  service = inject(PetService);
  toastr = inject(ToastrService);

  loadPets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPets),
      exhaustMap(() =>
        this.service.getAll().pipe(
          map((res: any) => {
            console.log('Mascotas cargadas:', res.datos);
            return loadPetsSuccess({ list: res.datos });
          }),
          catchError((err) => {
            console.error('Error cargando mascotas:', err);
            return of(loadPetsFailure({ errMsg: err.message }));
          })
        )
      )
    )
  );

  deletePet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePet),
      switchMap((action) =>
        this.service.delete(action.petId).pipe(
          map(() => {
            this.showAlert('Mascota eliminada correctamente', 'pass');
            return deletePetSuccess({ petId: action.petId });
          }),
          catchError((err) => {
            this.showAlert(err.message, 'fail');
            return of(deletePetFailure({ errMsg: err.message }));
          })
        )
      )
    )
  );

  addPet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPet),
      switchMap((action) =>
        this.service.create(action.data).pipe(
          switchMap(() =>
            of(
              addPetSuccess({ data: action.data }),
              this.showAlert('Mascota agregada correctamente', 'pass')
            )
          ),
          catchError((err) =>
            of(
              this.showAlert(err.message, 'fail'),
              addPetFailure({ errMsg: err.message })
            )
          )
        )
      )
    )
  );

  updatePet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePet),
      switchMap((action) =>
        this.service.update(action.data.id, action.data).pipe(
          switchMap(() =>
            of(
              updatePetSuccess({ data: action.data }),
              this.showAlert('Mascota actualizada correctamente', 'pass')
            )
          ),
          catchError((err) =>
            of(
              this.showAlert(err.message, 'fail'),
              updatePetFailure({ errMsg: err.message })
            )
          )
        )
      )
    )
  );

  showAlert(message: string, response: string) {
    response === 'pass'
      ? this.toastr.success(message)
      : this.toastr.error(message);
    return emptyAction();
  }
}
