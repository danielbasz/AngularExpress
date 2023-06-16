import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CSVData } from '../models/CSVData';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:3000/data';

  constructor(private http: HttpClient) { }

  getData(): Observable<CSVData[]> {
    return this.http.get<CSVData[]>(this.url);
    
  }
}
