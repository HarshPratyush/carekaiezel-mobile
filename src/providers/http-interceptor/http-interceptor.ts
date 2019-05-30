import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpHeaders, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsServiceProvider } from '../constants-service/constants-service';
import { catchError, switchMap, finalize, filter, take, tap } from 'rxjs/operators';
import { Observable,BehaviorSubject,Subject } from 'rxjs';
import { UtilServiceProvider } from '../util-service/util-service';
/*
  Generated class for the HttpInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {

  isRefreshTokenExpired: boolean;
  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient,private constants:ConstantsServiceProvider,private utilService:UtilServiceProvider) { }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token)
      return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) })
    else
      return req.clone();

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.utilService.createLoader();
    return next.handle(this.addToken(req, localStorage.getItem(this.constants.ACCESS_TOKEN)))
      .pipe(catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 400:
                this.utilService.stopLoader();
              return this.handle400Error(error);
            case 401:
              return this.handle401Error(req, next);
          }
          this.utilService.stopLoader();
          return Observable.throw(error);
        } 
      })).pipe(tap((event: HttpEvent<any>) => { 
        if (event instanceof HttpResponse) {
          this.utilService.stopLoader();
        }
      },
        (err: any) => {
          this.utilService.stopLoader();
      }));;
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url === this.constants.API_GATEWAY + this.constants.LOGIN_URL) {
      this.logoutUser();
    }
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);
      return this.refreshToken()
        .pipe(switchMap((refreshToken: string) => {
          // this.loader.stop();
          if (refreshToken) {
            this.tokenSubject.next(refreshToken);
            this.isRefreshingToken = false;
            return next.handle(this.addToken(req, refreshToken))

          }
          // If we don't get a new token, we are in trouble so logout.
          return this.logoutUser();
        }))
        .pipe(catchError(() => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          return this.logoutUser();
        }))
        .pipe(finalize(() => {
          this.isRefreshingToken = false;
        }));
      // });

    } else {
      return this.tokenSubject
        .pipe(filter(token => token != null))
        .pipe(take(1))
        .pipe(switchMap(token => {
          return next.handle(this.addToken(req, token));
        }));
    }
  }

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


  refreshToken(): Observable<string> {
    const tokenObsr = new Subject<string>();
    const token_refreshed = localStorage.getItem(this.constants.REFRESH_TOKEN);

    if (token_refreshed) {

      let URL: string = this.constants.API_GATEWAY+ 'oauth/token';
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        })
      };
      let params = new URLSearchParams();
      params.append('refresh_token', localStorage.getItem(this.constants.REFRESH_TOKEN));
      params.append('grant_type', 'refresh_token')

      this.http.post<UserToken>(URL, params.toString(), httpOptions)
        .subscribe(response => {

          localStorage.setItem(this.constants.ACCESS_TOKEN, response.access_token);

          tokenObsr.next(response.access_token);
        }, err => {
          this.logoutUser();
        });
    }
    return tokenObsr.asObservable();
  }

}


interface UserToken {
  access_token: string;
  refresh_token: string;
}