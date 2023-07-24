import { NgModule } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpClientModule,HTTP_INTERCEPTORS,HttpBackend} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { AppLayoutComponent } from '@app/app-layout/app-layout.component';
import { AppHeaderComponent } from '@app/app-layout/app-header/app-header.component';
import { AppSideBarComponent } from '@app/app-layout/app-side-bar/app-side-bar.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationResolver } from '@app/auth/authentication.resolver';
import { DirectiveModule } from './directive/directive.module';
import { SidebarModule } from 'primeng/sidebar';
import { AppHomePageComponent } from "@app/app-home-page/app-home-page.component";
import { AuthModule } from '@app/auth/auth.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/environment';

import { AppLoaderComponent } from './app-loader.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { AppBaseService } from './app.base.service';
import { DialogService } from 'primeng/dynamicdialog';
import { WidgetsBaseModule } from './widgets/widgets.base.module';
import { SharedModule } from '@app/shared/shared.module';
import { HttpRequestInterceptorService } from './http-request-interceptor.service';
import { registerLocaleData } from '@angular/common';
import { BaseAppConstants } from './app-constants.base';
import(/* webpackInclude: /(en|de|fr|ru|tr|it|pl|uk|nl|ja|ko|zh)\.mjs$/ */ `../../node_modules/@angular/common/locales/${BaseAppConstants.defaultLocale.substring(0, 2)}.mjs`).then(locale => {
  registerLocaleData(locale.default);  
});


export function HttpLoaderFactory(http: HttpBackend) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n-base/', suffix: '.json' },
    { prefix: './assets/i18n/', suffix: '.json' },
  ]);
}
@NgModule({
  declarations: [
    AppLayoutComponent,
    AppHeaderComponent,
    AppSideBarComponent,
    AppHomePageComponent,
    AppLoaderComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    DirectiveModule,
    WidgetsBaseModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend]
      }
    }),
    SidebarModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: "registerImmediately"
    // }),
    AuthModule


  ],
  exports: [
    BrowserAnimationsModule,
    TranslateModule,
    AuthModule,
    SharedModule
  ],
  providers: [ConfirmationService, AuthenticationResolver, MessageService, DatePipe, AppBaseService,DialogService, DecimalPipe,
    [
      { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptorService, multi: true }
  ],
],
  bootstrap: []
})
export class AppBaseModule {

}

