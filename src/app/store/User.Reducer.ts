// src/app/store/User.Reducer.ts
import { createReducer, on } from "@ngrx/store";
import { userState } from "./User.State";
import {
  deleteUserSuccess,
  loadUsers,
  getUser,
  loadUsersFailure,
  loadUsersSuccess,
  addUserSuccess,
  updateUserSuccess
} from "./User.Action";

const _userReducer = createReducer(userState,
  on(loadUsersSuccess, (state, action) => ({
    ...state,
    list: action.list,
    errormessage: ''
  })),

  on(loadUsersFailure, (state, action) => ({
    ...state,
    list: [],
    errormessage: action.errMsg
  })),

  on(deleteUserSuccess, (state, action) => {
    const _newdata = state.list.filter(u => u.id !== action.userId);
    return {
      ...state,
      list: _newdata,
      errormessage: ''
    };
  }),

  on(addUserSuccess, (state, action) => ({
    ...state,
    list: [...state.list, { ...action.data }],
    errormessage: ''
  })),

  on(updateUserSuccess, (state, action) => {
    const _updatedList = state.list.map(u => u.id === action.data.id ? action.data : u);
    return {
      ...state,
      list: _updatedList,
      errormessage: ''
    };
  }),

  on(getUser, (state, action) => {
    const _found = state.list.find(u => u.id === action.userId);
    return {
      ...state,
      userobj: _found ? _found : state.userobj
    };
  })
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
