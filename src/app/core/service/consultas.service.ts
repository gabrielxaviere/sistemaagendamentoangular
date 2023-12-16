import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Consultas } from '../models/consulta';
import { environment } from 'src/environments/environment';
import { ConsultaList } from '../list/ConsultaList';

const API_URL = environment.apiUrl + '/api/Consultas';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  constructor(private http: HttpClient) { }

  getAll(nome: string, data: Date, status: number, responsavel: number, idUsuario: number): Observable<Consultas[]> {
    let params = new HttpParams()

    if (nome) {
      params = params.set('nome', nome);
    }

    if (data) {
      params = params.set('data', data.toISOString());
    }

    if (status !== null && status !== undefined) {
      params = params.set('status', status.toString());
    }

    if (responsavel !== null && responsavel !== undefined) {
      params = params.set('responsavel', responsavel.toString());
    }

    if (idUsuario !== null && idUsuario !== undefined) {
      params = params.set('idUsuario', idUsuario.toString());
    }

    return this.http.get<Consultas[]>(API_URL, { params: params })
      .pipe(catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  getWithMedicos(nome: string, data: Date, status: number, responsavel: number, idUsuario: number): Observable<ConsultaList[]> {
    let params = new HttpParams()

    if (nome) {
      params = params.set('nome', nome);
    }

    if (data) {
      params = params.set('data', data.toISOString());
    }

    if (status !== null && status !== undefined) {
      params = params.set('status', status.toString());
    }

    if (responsavel !== null && responsavel !== undefined) {
      params = params.set('responsavel', responsavel.toString());
    }

    if (idUsuario !== null && idUsuario !== undefined) {
      params = params.set('idUsuario', idUsuario.toString());
    }

    return this.http.get<Consultas[]>(API_URL+'/getwithmedicos', { params: params })
      .pipe(catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  getById(id: number): Observable<Consultas> {
    return this.http.get<Consultas>(API_URL + `/${id}`)
      .pipe(catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  getAllDisabledDate(responsavel: number): Observable<Consultas[]> {
    return this.http.get<Consultas[]>(API_URL + "/getalldisableddate" + `/${responsavel}`)
      .pipe(catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  create(item: Consultas): Observable<Consultas> {
    return this.http.post<Consultas>(API_URL, item)
      .pipe(catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  update(usuario: Consultas): Observable<any> {
    return this.http.put(API_URL, usuario).pipe(catchError((error, caught) => {
      return of(error);
    }) as any);
  }

  delete(id: number): Observable<Consultas> {
    const url = `${API_URL}/${id}`;
    return this.http.delete<Consultas>(url);
  }
}
