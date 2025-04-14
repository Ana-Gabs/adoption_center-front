// src/app/store/User.Action.ts
import { createAction, props } from '@ngrx/store';
import { User } from '../models/user'; // Importamos el modelo User

// Definimos las acciones para cargar los usuarios
export const LOAD_USERS = '[User] getAll';
export const LOAD_USERS_SUCCESS = '[User] getAll Success';
export const LOAD_USERS_FAILURE = '[User] getAll Failure';

// Acciones para eliminar un usuario
export const DELETE_USER = '[User] Delete';
export const DELETE_USER_SUCCESS = '[User] Delete Success';
export const DELETE_USER_FAILURE = '[User] Delete Failure';

// Acciones para agregar un nuevo usuario
export const ADD_USER = '[User] Add';
export const ADD_USER_SUCCESS = '[User] Add Success';
export const ADD_USER_FAILURE = '[User] Add Failure';

// Acciones para actualizar los datos de un usuario
export const UPDATE_USER = '[User] Update';
export const UPDATE_USER_SUCCESS = '[User] Update Success';
export const UPDATE_USER_FAILURE = '[User] Update Failure';

// Acción para obtener un solo usuario
export const GET_USER = '[User] getOne';
export const GET_USER_SUCCESS = '[User] getOne Success';
export const GET_USER_FAILURE = '[User] getOne Failure';

// Definición de las acciones

export const loadUsers = createAction(LOAD_USERS); // Acción para cargar todos los usuarios
export const loadUsersSuccess = createAction(LOAD_USERS_SUCCESS, props<{ list: User[] }>());
export const loadUsersFailure = createAction(LOAD_USERS_FAILURE, props<{ errMsg: string }>());

export const deleteUser = createAction(DELETE_USER, props<{ userId: number }>());
export const deleteUserSuccess = createAction(DELETE_USER_SUCCESS, props<{ userId: number }>());
export const deleteUserFailure = createAction(DELETE_USER_FAILURE, props<{ errMsg: string }>());

export const addUser = createAction(ADD_USER, props<{ data: User }>());
export const addUserSuccess = createAction(ADD_USER_SUCCESS, props<{ data: User }>());
export const addUserFailure = createAction(ADD_USER_FAILURE, props<{ errMsg: string }>());

export const updateUser = createAction(UPDATE_USER, props<{ data: User }>());
export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS, props<{ data: User }>());
export const updateUserFailure = createAction(UPDATE_USER_FAILURE, props<{ errMsg: string }>());

export const getUser = createAction(GET_USER, props<{ userId: number }>());
export const getUserSuccess = createAction(GET_USER_SUCCESS, props<{ data: User }>());
export const getUserFailure = createAction(GET_USER_FAILURE, props<{ errMsg: string }>());

export const emptyAction = createAction('[User] Empty');
