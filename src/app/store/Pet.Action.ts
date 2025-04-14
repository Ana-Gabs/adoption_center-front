// src/app/store/Pet.Action.ts
import { createAction, props } from '@ngrx/store';
import { Pet } from '../models/pets';

export const LOAD_PETS = '[Pet] getAll';
export const LOAD_PETS_SUCCESS = '[Pet] getAll Success';
export const LOAD_PETS_FAILURE = '[Pet] getAll Failure';

export const DELETE_PET = '[Pet] Delete';
export const DELETE_PET_SUCCESS = '[Pet] Delete Success';
export const DELETE_PET_FAILURE = '[Pet] Delete Failure';

export const ADD_PET = '[Pet] Add';
export const ADD_PET_SUCCESS = '[Pet] Add Success';
export const ADD_PET_FAILURE = '[Pet] Add Failure';

export const UPDATE_PET = '[Pet] Update';
export const UPDATE_PET_SUCCESS = '[Pet] Update Success';
export const UPDATE_PET_FAILURE = '[Pet] Update Failure';

export const GET_PET = '[Pet] getOne';
export const GET_PET_SUCCESS = '[Pet] getOne Success';
export const GET_PET_FAILURE = '[Pet] getOne Failure';

export const loadPets = createAction(LOAD_PETS);
export const loadPetsSuccess = createAction(LOAD_PETS_SUCCESS, props<{ list: Pet[] }>());
export const loadPetsFailure = createAction(LOAD_PETS_FAILURE, props<{ errMsg: string }>());

export const deletePet = createAction(DELETE_PET, props<{ petId: number }>());
export const deletePetSuccess = createAction(DELETE_PET_SUCCESS, props<{ petId: number }>());
export const deletePetFailure = createAction(DELETE_PET_FAILURE, props<{ errMsg: string }>());

export const addPet = createAction(ADD_PET, props<{ data: Pet }>());
export const addPetSuccess = createAction(ADD_PET_SUCCESS, props<{ data: Pet }>());
export const addPetFailure = createAction(ADD_PET_FAILURE, props<{ errMsg: string }>());

export const updatePet = createAction(UPDATE_PET, props<{ data: Pet }>());
export const updatePetSuccess = createAction(UPDATE_PET_SUCCESS, props<{ data: Pet }>());
export const updatePetFailure = createAction(UPDATE_PET_FAILURE, props<{ errMsg: string }>());

export const getPet = createAction(GET_PET, props<{ petId: number }>());
export const emptyAction = createAction('[Pet] Empty');
