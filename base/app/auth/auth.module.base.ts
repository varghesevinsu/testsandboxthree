import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanDeactivateGuard } from '@baseapp/auth.can-deactivate-guard.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TranslateModule } from '@ngx-translate/core';
import { LoginDetailComponent } from '@app/auth/login/login.component';
import { ForgotPasswordComponent } from '@app/auth/forgot-password/forgot-password.component';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
 
@NgModule({
  declarations: [
    LoginDetailComponent,
    ForgotPasswordComponent
  ],
  providers: [ CanDeactivateGuard, MessageService ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    
    MessagesModule,
    MessageModule,
    CheckboxModule
  ],
  exports : [
    FormsModule,
    MessagesModule,
    MessageModule,
    CheckboxModule
  ]
})
export class AuthBaseModule { }
