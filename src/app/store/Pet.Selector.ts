import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PetsModel } from "./Pet.model";

const getPetsState = createFeatureSelector<PetsModel>('pet');

export const getPetsList = createSelector(getPetsState, (state) => state.list);

export const selectPet = createSelector(getPetsState, (state) => state.petobj);
