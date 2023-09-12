import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  form !: FormGroup;

  constructor(
    private navCtrl : NavController,
    private router : Router,
    private placesService : PlacesService,
    private loadingCtrl : LoadingController
  ) { }

  ngOnInit() {
    //using reactive form module
    this.form = new FormGroup({
      title : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      dateFrom : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    })
  }

  onCreateOffer(){
    if(!this.form.valid){
      return;
    }
    //this.router.navigate(['/', 'places', 'tabs', 'offers']);
    //add place to discover page
    console.log(this.form);

    this.loadingCtrl.create({
      message: 'Creating place...'
    }).then(loadingEl => {
      loadingEl.present();//present loading element when we start sending the data
      this.placesService.addPlace(
        this.form.value.title,
        this.form.value.description,
        +this.form.value.price,
        new Date(this.form.value.dateFrom),
        new Date(this.form.value.dateTo)
      ).subscribe(() => {
        loadingEl.dismiss();//and we clear it here once we done with it
        this.form.reset();//to reset input 
        this.router.navigate(['/places/tabs/offers']);
      });
    })
  } 
}
  

     


