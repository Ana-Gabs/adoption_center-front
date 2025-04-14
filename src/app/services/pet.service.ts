// src/app/service/pet.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pet } from '../models/pets';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private baseUrl = 'http://localhost:10000/pets/api/';

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0NjA2MTIyLCJpYXQiOjE3NDQ2MDQ5MjIsImp0aSI6ImQ1ODE2MmNkZGZiNDQxYWI5MmVmYTkwZDFhZjEyNDRiIiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJnYWJzIiwiZW1haWwiOiJnYWJzQGdtYWlsLmNvbSIsImlzX3N0YWZmIjpmYWxzZSwicm9sZSI6IkFkbWluIn0.o1TGr7Qyip5nO6lhEjSsOHz86-TDIBB2KQ7P3pAyDDk';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Pet[]>(this.baseUrl, this.httpOptions);
  }

  getById(id: number) {
    return this.http.get<Pet>(`${this.baseUrl}${id}/`, this.httpOptions);
  }

  create(pet: Pet) {
    return this.http.post<Pet>(this.baseUrl, pet, this.httpOptions);
  }

  update(id: number, pet: Pet) {
    return this.http.put<Pet>(`${this.baseUrl}${id}/`, pet, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}${id}/`, this.httpOptions);
  }
}
