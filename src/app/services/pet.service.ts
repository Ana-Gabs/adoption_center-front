// src/app/service/pet.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pet } from '../models/pets';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private baseUrl = 'http://localhost:10000/pets/api/';

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0NjM2OTY2LCJpYXQiOjE3NDQ2MzU3NjYsImp0aSI6IjZmMGQ1NGI2ZjJmYjQ3MTE5OTFiNzkxYTljZDllOWQyIiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJnYWJzIiwiZW1haWwiOiJnYWJzQGdtYWlsLmNvbSIsImlzX3N0YWZmIjpmYWxzZSwicm9sZSI6IkFkbWluIn0._wRwxKvN3ebbKkMtXPwgPzeJabPFh1x8II6Mr-6NUiU';
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
