import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Subject {
  _id: string;
  subject: string;
  teacher: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  constructor(private http: HttpClient) {}

  getSubjects(): Observable<Subject[]> {
    //return this.http.get<Subject[]>('http://localhost:8010/api/subjects');
    return this.http.get<Subject[]>('https://angularprojectbackend-4e78.onrender.com/api/subjects');
  }
}
