import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CSVData } from '../models/CSVData.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:3000/api/data';

  constructor(private http: HttpClient) { }

  //get all data
  getData(): Observable<CSVData[]> {
    return this.http.get<CSVData[]>(this.url);
  }

  //get data by id
  getDataById(ID: string): Observable<CSVData> {
    return this.http.get<CSVData>(`${this.url}/${ID}`);
  }

  //create data
  createData(data: CSVData): Observable<CSVData> {
    return this.http.post<CSVData>(this.url, data);
  }

  //update data
  updateData(data: CSVData): Observable<CSVData> {
    return this.http.put<CSVData>(`${this.url}/${data.ID}`, data);
  }

  //delete data
  deleteData(id: string): Observable<CSVData> {
    return this.http.delete<CSVData>(`${this.url}/${id}`);
  }

}
