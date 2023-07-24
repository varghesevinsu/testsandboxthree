import { inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { AppLoaderService } from "@baseapp/app-loader.service";
import { BaseService } from "@baseapp/base.service";
import { environment } from "@env/environment";
import { Observable, of } from "rxjs";
import { AuthApiConstants } from './auth.api-constants';
import { PrototypeVariables } from "./prototype.variables";

@Injectable({
    providedIn: 'root',
})
export class AuthBaseService {
  public baseService = inject(BaseService)

    
    isAuthenticating:boolean = false;
    login(params:any){
        const currentUserSubject = new Observable((observer:any) => {
            this.baseService.get(AuthApiConstants.login).subscribe(
              (data: any) => {
                observer.next(data);
              },
              (error: any) => {
                observer.error(error);
              }
            );
          });
    
          return currentUserSubject;
    }
    authenticate(params?:any){
      // const url = AuthApiConstants.authenticate.url.replace('{APP_ID}',PrototypeVariables.APP_ID);
      this.isAuthenticating = true;
      const url = AuthApiConstants.authenticate.url;
      const currentUserSubject = new Observable((observer:any) => {
          this.baseService.get({url : url}).subscribe(
            (data: any) => {
              observer.next(data);
              this.isAuthenticating = false;
            },
            (error: any) => {
              observer.error(error);
              this.isAuthenticating = false;
            }
          );
        });

        return currentUserSubject;
    
    }
    recoverPassword(params: any){
        const currentUserSubject = new Observable((observer:any) => {
            this.baseService.get({url: '/login'}, params).subscribe(
              (data: any) => {
                observer.next(data);
              },
              (error: any) => {
                observer.error(error);
              }
            );
          });
    
          return currentUserSubject;
    }


    getGoogleAuthorized(){
    const url = '/rest/oauth2/authorization/google';
      const currentUserSubject = new Observable((observer:any) => {
          this.baseService.get({url : url}).subscribe(
            (data: any) => {
              observer.next(data);
              this.isAuthenticating = false;
            },
            (error: any) => {
              observer.error(error);
              this.isAuthenticating = false;
            }
          );
        });

        return currentUserSubject;
    }


    getUserInfo(params?:any){
      this.isAuthenticating = true;
      const url = AuthApiConstants.getUserData.url;
      const currentUserSubject = new Observable((observer:any) => {
          this.baseService.get({url : url}).subscribe(
            (data: any) => {
              observer.next(data);
              this.isAuthenticating = false;
            },
            (error: any) => {
              observer.error(error);
              this.isAuthenticating = false;
            }
          );
        });

        return currentUserSubject;
    
    }
  }