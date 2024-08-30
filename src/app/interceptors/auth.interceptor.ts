import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/* @Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService){
    console.log('Si se ejecuta interceptor');
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    console.log('Si entre al intercept');

    console.log(authToken);

    if(req.url.includes('/auth/login')){
      return next.handle(req);
    }

    if(authToken){
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
} */


export const authInterceptor:HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('token');
  const router = new Router();

  if(req.url.includes('/auth/login')){
    return next(req);
  }

  const authReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq).pipe(
    catchError((err:any) => {
      if(err instanceof HttpErrorResponse) {
        if(err.status === 401){
          console.error('You are not authorized in the app: ', err);
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          router.navigate(['/login']);
        }
      }
      return throwError(() => err); 
    })
  );
}