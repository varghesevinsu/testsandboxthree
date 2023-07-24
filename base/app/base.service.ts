import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AppLoaderService } from './app-loader.service';
import { NotifiactionService } from './notification.service';
import { TranslateService } from '@ngx-translate/core';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BaseService {
    private readonly defaultContentType = 'application/json'
  public http = inject(HttpClient);
  private loader = inject(AppLoaderService)
  private notification = inject(NotifiactionService)
  private translateService = inject(TranslateService)
   

  public get(options: any, params?: any): Observable<any> {
    if (options.showloading) {
      this.loader.show();
    }
    const url = this.normalizeUrl(options.url, params);
    return this.http.get(url).pipe(
      tap(_ => {
        this.loader.hide();
      }),
      catchError((err: any, caught: Observable<any>) => {
        if(options.handleError === false){
          this.loader.hide();
          return throwError(err);
        }
        else{
          this.handleError(options, err);
          return throwError(this.handleError(options, err));
        }
      })
    );
  }

  public post(options: any, params?: any, data?: any): Observable<any> {  
    if (options.showloading) {
      this.loader.show();
    }
    
    const httpOptions = this.getHttpHeaders(options);
    const url = this.normalizeUrl(options.url, params);
    return this.http.post(url, params, httpOptions).pipe(
      tap(_ => {
        this.loader.hide();
      }),
      catchError((err: any, caught: Observable<any>) => {
        if(options.handleError === false){
          this.loader.hide();
          return throwError(err);
        }
        else{
          this.handleError(options, err);
          return throwError(this.handleError(options, err));
        }
      })
    );

  }

  public put(options: any, params?: any, data?: any): Observable<any> {
    if (options.showloading) {
      this.loader.show();
    }
    const httpOptions = this.getHttpHeaders(options);
    const url = this.normalizeUrl(options.url, params);
    return this.http.put(url, params, httpOptions).pipe(
      tap(_ => {
        this.loader.hide();
      }),
      catchError((err: any, caught: Observable<any>) => {
        if(options.handleError === false){
          this.loader.hide();
          return throwError(err);
        }
        else{
          this.handleError(options, err);
          return throwError(this.handleError(options, err));
        }
      })
    );

  }

  public delete(options: any, params?: any): Observable<any> {
    if (options.showloading) {
      this.loader.show();
    }
    const httpOptions = this.getHttpHeaders(options);
    const url = this.normalizeUrl(options.url, params);
    return this.http.delete(url, httpOptions).pipe(
      tap(_ => {
        this.loader.hide();
      }),
      catchError((err: any, caught: Observable<any>) => {
        if(options.handleError === false){
          this.loader.hide();
          return throwError(err);
        }
        else{
          this.handleError(options, err);
          return throwError(this.handleError(options, err));
        }
      })
    );

  }

  private normalizeUrl(baseUrl: string, params?: any): string {
    if (baseUrl.indexOf('{') === -1 || !params) {
      return `${baseUrl}`;
    }
    const splitUrl = baseUrl.split('/');
    let buildUrl:string = '' ;
    
    if (splitUrl.length > 1) {
      let tempUrl: string;
      for (let index = 0, length = splitUrl.length; index < length; index++) {

        tempUrl = splitUrl[index];
        if (!tempUrl) { continue; }

        if (tempUrl[0] === '{' && tempUrl[tempUrl.length - 1] === '}') {

          const param = tempUrl.replace('{', '').replace('}', '');
          const urlParameter = params[param];
          delete params[param];
          if (urlParameter !== undefined && urlParameter != null) {
            buildUrl = buildUrl + '/' + urlParameter;
          }

        } else {

          if (buildUrl[buildUrl.length - 1] !== '/') {
            buildUrl = buildUrl + '/';
          }
          buildUrl = buildUrl + tempUrl;
        }
      }

      
      // return encodeURI(buildUrl);
    }
    return buildUrl;

  }

  public getServiceUrl(url: string) {
    const serviceUrl = this.normalizeUrl(url);
    return serviceUrl;
  }

  private getHttpHeaders(options: any) {

    let contentTypeHeader: string = (options.headers ? options.headers.get('Content-Type') : '');

    if (!contentTypeHeader) {
      contentTypeHeader = this.defaultContentType;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': contentTypeHeader
      })
    };

    return httpOptions;
  }

  private handleError(options: any, err: any) {
    this.loader.hide();
    // if(err.status == "401"){
    //   location.href = '/logout';
    // }
    if (err.error instanceof ErrorEvent) {
      /** A client-side or network error occurred. */
      console.error('An error occurred:', err.error.message);
    } else if (options.showErrorMsg !== false) {
      let errorMsg = '';
      if (err.error && err.error.DETAIL) {
        err.error.DETAIL.map((e:any) => {
          errorMsg += `${this.translateService.instant(e.MESSAGE)}`;
        });
      } else if (err.error && err.error.MESSAGE) {
        errorMsg = `${this.translateService.instant(err.error.MESSAGE)}`;
        
      }
       
            if (err.data && err.data.validationErrors && err.data.validationErrors.length) {
              for (err of err.data.validationErrors) {
                errorMsg += `${this.translateService.instant(err.message)}`;
                
              }
            } else if (err.formattedMsg) {
              errorMsg = `${this.translateService.instant(err.formattedMsg)}`;
              
            } else if (err.data && err.data.applicationMessage) {
              errorMsg = `${this.translateService.instant(err.data.applicationMessage)}`;
              
            } 
            // else if (err.error && err.error.MESSAGE) {
            //   errorMsg = err.error.MESSAGE;
            // }

      // if (!errorMsg) {
      //   errorMsg = 'The record couldn\'t be updated. Please try again';
      // }
     if(errorMsg)
      this.notification.showMessage({severity:'error',icon:'', summary:'', detail:errorMsg})
    }
  }

  public getPrototypingData(options: any, params?: any): any {
    if (options.showloading) {
      this.loader.show();
    }
    const url = options.url;

    return this.http.get(url).pipe(
      tap(_ => {
        this.loader.hide();
      }),
      catchError((err: any, caught: Observable<any>) => {
        this.handleError(options, err);
        return throwError(this.handleError(options, err));
      })
    );
  }

  
  getUrl(url: string, queryString: string): string {
    return url + queryString;
  }
  
  search(url: string, queryString: string): Observable<any> {
    let _URL = this.getUrl(url, queryString);
    return this.http.get(_URL);
  }

}
