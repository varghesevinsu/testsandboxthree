import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingBaseModule } from '@baseapp/auth/auth-routing.module.base';

import { routes } from '@baseapp/projects/projects-routing.module.base';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule extends AuthRoutingBaseModule{ }
