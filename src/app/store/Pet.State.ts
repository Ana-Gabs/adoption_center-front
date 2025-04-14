import { PetsModel } from "./Pet.Model";

export const petState: PetsModel = {
  list: [],
  errormessage: '',
  petobj: {
    id: 0,
    nombre: "",
    especie: "",
    edad: 0,
    descripcion: "",
    imagen: "",
    adoptado: false
  }
};
