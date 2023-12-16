import { MessageService } from 'src/app/core/service/message.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
const API_URL = environment.apiUrl + '/api/Login';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient,private messageService: MessageService) {
    const currentUserString = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(currentUserString || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentUserTypeValue(): number {
    return this.currentUserSubject.value.tipo;
  }

  login(email: string, password: string) {
    let params = {
      email: email,
      password: password,
    }
    return this.http
      .get<any>(API_URL + '?' + this.urlParam(params))
      .pipe(
        map(res => {
          if(res.id > 0)
          {
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.currentUserSubject.next(res);
            return res;
          }   
          else{
            this.logout();
            this.messageService.openErrorSnackBar("Usuário ou senha inválidas");
          }       
        })
      );
  }

  urlParam(obj: any): string {
    return Object.keys(obj)
      .map(k => k + '=' + encodeURIComponent(obj[k]))
      .join('&');
  }

  logout() {
    const emptyUser = new User();
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(emptyUser);
    return of({ success: false });
  }
}
