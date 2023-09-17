import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; //added

import { IonicModule } from '@ionic/angular';

import { NewOfferPageRoutingModule } from './new-offer-routing.module';

import { NewOfferPage } from './new-offer.page';
import { SharedModule } from 'src/app/shared/shared.modul';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, //newly added
    IonicModule,
    NewOfferPageRoutingModule,
    SharedModule //able to use the picker and map modal in this component
  ],
  declarations: [NewOfferPage]
})
export class NewOfferPageModule {}
