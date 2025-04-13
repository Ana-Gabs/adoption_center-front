// src/app/model/pet.ts
export interface Pet {
    id: number;
    nombre: string;
    especie: string;
    edad: number;
    descripcion: string;
    imagen: string | null;
    adoptado: boolean;
  }
