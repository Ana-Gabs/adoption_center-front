
// src/app/store/Pet.Model.ts
import { Pet } from '../models/pets';
export interface PetsModel {
   list:Pet[],
   errormessage: string,
   petobj: Pet;
}
