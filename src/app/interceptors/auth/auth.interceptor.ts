import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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