// src/app/store/User.Selector.ts
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersModel } from "./User.Model";

// Selector base del estado
const getUsersState = createFeatureSelector<UsersModel>('user');

// Lista de usuarios
export const getUsersList = createSelector(
  getUsersState,
  (state) => state.list
);

// Usuario seleccionado (userobj)
export const selectUser = createSelector(
  getUsersState,
  (state) => state.userobj
);
