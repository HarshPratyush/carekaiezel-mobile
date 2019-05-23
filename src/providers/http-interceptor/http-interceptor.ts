import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsServiceProvider } from '../constants-service/constants-service';
import { catchError, tap, switchMap, finalize, filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the HttpInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {

  isRefreshTokenExpired: boolean;
  isRefreshingToken: boolean = false;

  constructor(private http: HttpClient,private constants:ConstantsServiceProvider) { }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token)
      return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) })
    else
      return req.clone();

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(this.addToken(req, localStorage.getItem(this.constants.ACCESS_TOKEN)))
      // .pipe(catchError(error => {
      //   if (error instanceof HttpErrorResponse) {
      //     switch ((<HttpErrorResponse>error).status) {
      //       // case 400:
      //       //   return this.handle400Error(error);
      //       case 401:
      //         // return this.handle401Error(req, next);
      //     }
      //     return throwError(error);
      //   } 
      // }));
  }

  // handle401Error(req: HttpRequest<any>, next: HttpHandler) {
  //   if (req.url === this.constants.API_GATEWAY + this.constants.LOGIN_URL) {
  //     this.logoutUser();
  //   }
  //   if (!this.isRefreshingToken) {
  //     this.isRefreshingToken = true;

  //     // Reset here so that the following requests wait until the token
  //     // comes back from the refreshToken call.
  //     this.tokenSubject.next(null);
  //     return this.refreshToken()
  //       .pipe(switchMap((refreshToken: string) => {
  //         this.loader.stop();
  //         if (refreshToken) {
  //           this.tokenSubject.next(refreshToken);
  //           this.isRefreshingToken = false;
  //           return next.handle(this.addToken(req, refreshToken))

  //         }
  //         // If we don't get a new token, we are in trouble so logout.
  //         return this.logoutUser();
  //       }))
  //       .pipe(catchError(error => {
  //         // If there is an exception calling 'refreshToken', bad news so logout.
  //         return this.logoutUser();
  //       }))
  //       .pipe(finalize(() => {
  //         this.isRefreshingToken = false;
  //       }));
  //     // });

  //   } else {
  //     return this.tokenSubject
  //       .pipe(filter(token => token != null))
  //       .pipe(take(1))
  //       .pipe(switchMap(token => {
  //         return next.handle(this.addToken(req, token));
  //       }));
  //   }
  // }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      this.deleteCookies();

    }
    return Observable.throw(error);
  }



  logoutUser() {
    // Route to the login page (implementation up to you)
    this.deleteCookies();
    return null;
  }

  deleteCookies() {
    localStorage.clear();
  }

}