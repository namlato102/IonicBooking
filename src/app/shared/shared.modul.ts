import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';

@NgModule({
  declarations: [LocationPickerComponent, MapModalComponent, ImagePickerComponent], //need to declared first
  imports: [CommonModule, IonicModule],
  exports: [LocationPickerComponent, MapModalComponent, ImagePickerComponent], //export to use from outside
  //entryComponents: [MapModalComponent] no need
})
export class SharedModule {}
