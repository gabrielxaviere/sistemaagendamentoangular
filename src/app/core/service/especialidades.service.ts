import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Especialidades } from '../models/especialidades';

const API_URL = environment.apiUrl +'/api/Especialidades';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Especialidades[]> {
    return this.http.get<Especialidades[]>(API_URL + "/getall")
      .pipe(catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  getById(id: number): Observable<Especialidades> {
    return this.http.get<Especialidades>(API_URL + `/${id}`)
      .pipe(catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  create(item: Especialidades): Observable<Especialidades> {
    return this.http.post<Especialidades>(API_URL, item)
      .pipe(catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  update(usuario: Especialidades): Observable<any> {
    return this.http.put(API_URL, usuario).pipe(catchError((error, caught) => {
      return of(error);
    }) as any);
  }

  delete(id: number): Observable<Especialidades> {
    const url = `${API_URL}/${id}`;
    return this.http.delete<Especialidades>(url);
  }
}
