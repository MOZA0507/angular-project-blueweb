import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envs } from '../../envs/envs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = 'token';

  constructor(private http: HttpClient) { }

  isLoggedIn():boolean {
    const username = localStorage.getItem('username');
    return username !== null && username !== undefined;
  }

  login(username: string, password: string):Observable<any>{
    return this.http.post<any>(`${envs.apiUrl}/auth/login`,{username,password});
    
  }

  setToken(token: string){
    localStorage.setItem(this.token, token);
  }

  getToken(): string|null{
    return localStorage.getItem(this.token);
  }

  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem(this.token);
  }
}
