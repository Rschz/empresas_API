import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateOrUpdatePage } from './create-or-update.page';

const routes: Routes = [
  {
    path: 'empresa/add',
    component: CreateOrUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateOrUpdatePageRoutingModule {}
