import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { switchMap } from 'rxjs';
import { PlaceLocation } from 'src/app/models/location.model';

import { PlacesService } from 'src/app/services/places.service';

function base64toBlob(base64Data: string, contentType: string) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}


@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  form !: FormGroup;

  constructor(
    private router : Router,
    private placesService : PlacesService,
    private loadingCtrl : LoadingController
  ) { }

  ngOnInit() {
    //using reactive form module
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      //location: new FormControl(null, { validators: [Validators.required] }),
      location: new FormControl(null),
      image: new FormControl(null)
    });
  }


  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ location: location });
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.form.patchValue({ image: imageFile });
  }

  onCreateOffer(){
    if (!this.form.valid || !this.form.get('image')!.value) {
      return;
    }
    //this.router.navigate(['/', 'places', 'tabs', 'offers']);
    //add place to discover page
    console.log(this.form.value);

    this.loadingCtrl
      .create({
        message: 'Creating place...'
      })
      .then(loadingEl => {
      loadingEl.present();//present loading element when we start sending the data
      // this.placesService
      //     .addPlace(
      //       this.form.value.title,
      //       this.form.value.description,
      //       +this.form.value.price,
      //       new Date(this.form.value.dateFrom),
      //       new Date(this.form.value.dateTo),
      //       this.form.value.location
      //     )
          this.placesService
          .uploadImage(this.form.get('image')!.value)
          .pipe(
            switchMap(uploadRes => { //return a observable
              return this.placesService.addPlace( //this is a observable
                this.form.value.title,
                this.form.value.description,
                +this.form.value.price,
                new Date(this.form.value.dateFrom),
                new Date(this.form.value.dateTo),
                this.form.value.location,
                uploadRes.imageUrl
              );
            })
          )
          .subscribe(() => {
            loadingEl.dismiss();//and we clear it here once we done with it
            this.form.reset();//to reset input 
            this.router.navigate(['/places/tabs/offers']);
          });
      })
  } 
}
  

     



