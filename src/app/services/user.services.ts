// src/app/service/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user'; // Asegúrate de tener un modelo User adecuado

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:10000/users/'; 

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0NjUyNTQ4LCJpYXQiOjE3NDQ2NTEzNDgsImp0aSI6IjM0ZmU0YzkxM2FiZDQ0MDU4YzBkNzc5MWJhNDgzNGViIiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJnYWJzIiwiZW1haWwiOiJnYWJzQGdtYWlsLmNvbSIsImlzX3N0YWZmIjpmYWxzZSwicm9sZSI6IkFkbWluIn0.NrPpb_7TroFLpEWqFCwXTZZAyC3_u0o9fZkj-aKrS5A'; 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`, 
    }),
  };

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getAll() {
    return this.http.get<User[]>(this.baseUrl, this.httpOptions);
  }

  // Obtener un usuario por su ID
  getById(id: number) {
    return this.http.get<User>(`${this.baseUrl}${id}/`, this.httpOptions);
  }

  // Crear un nuevo usuario
  create(user: User) {
    return this.http.post<User>(this.baseUrl, user, this.httpOptions);
  }

  // Actualizar los datos de un usuario
  update(id: number, user: User) {
    return this.http.patch<User>(`${this.baseUrl}${id}/`, user, this.httpOptions);
  }

  // Eliminar un usuario
  delete(id: number) {
    return this.http.delete(`${this.baseUrl}${id}/`, this.httpOptions);
  }
}
