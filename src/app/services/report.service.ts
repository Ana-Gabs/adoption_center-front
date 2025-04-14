// src/app/service/report.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Report {
  id?: number;
  pet: number;
  description: string;
  date_reported?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrl = 'http://localhost:10000/reports/';

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0NjQ0ODI1LCJpYXQiOjE3NDQ2NDM2MjUsImp0aSI6IjZkN2UxN2U1MDUxNzQ0NDZiNGYzODk1NzZlZGVhYzUwIiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJnYWJzIiwiZW1haWwiOiJnYWJzQGdtYWlsLmNvbSIsImlzX3N0YWZmIjpmYWxzZSwicm9sZSI6IkFkbWluIn0.ra8e-VZiupF_26BzGe30VLqQkP0a5Ide2_5Uytb4e-A';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(this.baseUrl, this.httpOptions);
  }

  getById(id: number): Observable<Report> {
    return this.http.get<Report>(`${this.baseUrl}${id}/`, this.httpOptions);
  }

  create(report: Report): Observable<Report> {
    return this.http.post<Report>(this.baseUrl, report, this.httpOptions);
  }

  update(id: number, report: Report): Observable<Report> {
    return this.http.patch<Report>(`${this.baseUrl}${id}/`, report, this.httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`, this.httpOptions);
  }
}
