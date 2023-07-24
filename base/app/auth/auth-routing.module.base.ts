import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ForgotPasswordComponent } from "@app/auth/forgot-password/forgot-password.component";
import { LoginDetailComponent } from "@app/auth/login/login.component";
import { CanDeactivateGuard } from '@baseapp/auth.can-deactivate-guard.service';

export const routes = [
  {
    path: 'login',
    component: LoginDetailComponent,
    data: {}
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {}
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingBaseModule
{

}