import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateOrUpdatePageRoutingModule } from './create-or-update-routing.module';

import { CreateOrUpdatePage } from './create-or-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateOrUpdatePageRoutingModule
  ],
  declarations: [CreateOrUpdatePage]
})
export class CreateOrUpdatePageModule {}
