import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl +'/api/Usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  getAll(text: string, responsavel: number): Observable<User[]> {
    let params = new HttpParams()
    
    if (text) {
      params = params.set('text', text);
    }

    if (responsavel !== null && responsavel !== undefined) {
      params = params.set('responsavel', responsavel.toString());
    }

    return this.http.get<User[]>(API_URL,{ params: params })
      .pipe(catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  getAllProfissional(especialidade: number): Observable<User[]> {
    return this.http.get<User[]>(API_URL + `/getprofissional/${especialidade}`)
      .pipe(catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  getAByTipo(tipo: number): Observable<User[]> {
    return this.http.get<User[]>(API_URL + `/gettipo/${tipo}`)
      .pipe(catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(API_URL + `/getforedit/${id}`)
      .pipe(catchError((error, caught) => {
        return of(error);
      }) as any);
  }

  create(item: User): Observable<User> {
    return this.http.post<User>(API_URL, item)
      .pipe(catchError((error, caught) => {
        console.log(error)
        return of(error);
      }) as any);
  }

  update(usuario: User): Observable<any> {
    return this.http.put(API_URL, usuario).pipe(catchError((error, caught) => {
      return of(error);
    }) as any);
  }

  delete(empresaId: number): Observable<User> {
    const url = `${API_URL}/${empresaId}`;
    return this.http.delete<User>(url);
  }
}
