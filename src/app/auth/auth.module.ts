import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingBaseModule } from '@baseapp/auth/auth-routing.module.base';
import { AuthBaseModule } from '@baseapp/auth/auth.module.base';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [    
  ],
  imports: [
    CommonModule,
    AuthBaseModule,
    AuthRoutingBaseModule,
  ],
  providers:[CookieService]
})
export class AuthModule{ }
