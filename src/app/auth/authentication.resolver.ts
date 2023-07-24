import { inject, Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { AppGlobalService } from '@baseapp/app-global.service';
import { combineLatest, Observable, Observer, of, Subject } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AuthenticationResolver implements Resolve<any> {

  public router = inject(Router);
  public auth = inject(AuthService);
  public appGlobalService = inject(AppGlobalService);
  public cookieService = inject(CookieService);

 
  public authenticate(): Observable<any> {
    const latest = combineLatest([this.isUserLoggedIn(), this.auth.getUserInfo()])
    return latest;
  }


  isUserLoggedIn(): Observable<boolean> {
    const isUserLoggedIn = this.cookieService.get('RAPPL');
    return Observable.create((obsr$: Observer<boolean>) => {
      if (isUserLoggedIn == 'yes') {
        obsr$.next(true);
        obsr$.complete();
      }
      else {
        obsr$.error('authentication failed');
        obsr$.complete();
      }

    })
  }

  resolve() {
    return this.authenticate().pipe(map(res => {
      this.appGlobalService.write('currentUser', res[1]);
    }),
      take(1),
      catchError((error) => {
        const isUserLoggedIn = this.cookieService.get('RAPPL');
        if(isUserLoggedIn == 'yes' && !this.appGlobalService.get('currentUser')){
          let redirectUrl = window.location.hash;
          let loginUrl = '/login';
          if (redirectUrl.indexOf("login") == -1) {
            loginUrl += "?redirectUrl=" + encodeURIComponent(redirectUrl);
          }
          this.router.navigateByUrl(loginUrl);
        }
        else{
          let redirectUrl = window.location.hash;
          let loginUrl = '/login';
          if (redirectUrl.indexOf("login") == -1) {
            loginUrl += "?redirectUrl=" + encodeURIComponent(redirectUrl);
          }
          this.router.navigateByUrl(loginUrl);
        }
        return of(false);
        return of('No data');
      }))
  }
}


