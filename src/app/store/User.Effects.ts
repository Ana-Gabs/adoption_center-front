// src/app/store/User.Effects.ts
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { UserService } from '../services/user.services';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
  addUser,
  addUserSuccess,
  addUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  emptyAction
} from './User.Action';

import { catchError, map, switchMap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  service = inject(UserService);
  toastr = inject(ToastrService);

  // Efecto para cargar usuarios
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      exhaustMap(() =>
        this.service.getAll().pipe(
          map((res: any) => {
            console.log('Respuesta desde el servicio:', res);
            if (Array.isArray(res)) {
              console.log('Usuarios cargados:', res);
              return loadUsersSuccess({ list: res });
            }
            if (res && res.datos) {
              console.log('Usuarios cargados:', res.datos);
              return loadUsersSuccess({ list: res.datos });
            }
            console.error('Error: respuesta del servicio no contiene "datos".');
            return loadUsersFailure({ errMsg: 'No se encontraron usuarios' });
          }),
          catchError((err) => {
            console.error('Error cargando usuarios:', err);
            return of(loadUsersFailure({ errMsg: err.message }));
          })
        )
      )
    )
  );

  // Efecto para eliminar un usuario
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      switchMap((action) =>
        this.service.delete(action.userId).pipe(
          map(() => {
            this.showAlert('Usuario eliminado correctamente', 'pass');
            return deleteUserSuccess({ userId: action.userId });
          }),
          catchError((err) => {
            this.showAlert(err.message, 'fail');
            return of(deleteUserFailure({ errMsg: err.message }));
          })
        )
      )
    )
  );

  // Efecto para agregar un nuevo usuario
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      switchMap((action) =>
        this.service.create(action.data).pipe(
          switchMap(() =>
            of(
              addUserSuccess({ data: action.data }),
              this.showAlert('Usuario agregado correctamente', 'pass')
            )
          ),
          catchError((err) =>
            of(
              this.showAlert(err.message, 'fail'),
              addUserFailure({ errMsg: err.message })
            )
          )
        )
      )
    )
  );

  // Efecto para actualizar un usuario
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      switchMap((action) =>
        this.service.update(action.data.id, action.data).pipe(
          switchMap(() =>
            of(
              updateUserSuccess({ data: action.data }),
              this.showAlert('Usuario actualizado correctamente', 'pass')
            )
          ),
          catchError((err) =>
            of(
              this.showAlert(err.message, 'fail'),
              updateUserFailure({ errMsg: err.message })
            )
          )
        )
      )
    )
  );

  // Función para mostrar alertas
  showAlert(message: string, response: string) {
    response === 'pass'
      ? this.toastr.success(message)
      : this.toastr.error(message);
    return emptyAction();
  }
}
