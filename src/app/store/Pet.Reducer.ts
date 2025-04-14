// src/app/store/Pet.Reducer.ts
import { createReducer, on } from "@ngrx/store";
import { petState } from "./Pet.State";
import { deletePetSuccess, loadPets, getPet, loadPetsFailure, loadPetsSuccess, addPetSuccess, updatePetSuccess } from "./Pet.Action";

const _petReducer = createReducer(petState,
  on(loadPetsSuccess, (state, action) => ({
    ...state,
    list: action.list,
    errormessage: ''
  })),

  on(loadPetsFailure, (state, action) => ({
    ...state,
    list: [],
    errormessage: action.errMsg
  })),

  on(deletePetSuccess, (state, action) => {
    const _newdata = state.list.filter(p => p.id !== action.petId);
    return {
      ...state,
      list: _newdata,
      errormessage: ''
    };
  }),

  on(addPetSuccess, (state, action) => ({
    ...state,
    list: [...state.list, { ...action.data }],
    errormessage: ''
  })),

  on(updatePetSuccess, (state, action) => {
    const _updatedList = state.list.map(p => p.id === action.data.id ? action.data : p);
    return {
      ...state,
      list: _updatedList,
      errormessage: ''
    };
  }),

  on(getPet, (state, action) => {
    const _found = state.list.find(p => p.id === action.petId);
    return {
      ...state,
      petobj: _found ? _found : state.petobj
    };
  })
);

export function petReducer(state: any, action: any) {
  return _petReducer(state, action);
}
