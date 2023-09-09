import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  form !: FormGroup;

  constructor(
    private navCtrl : NavController,
    private router : Router
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
    this.navCtrl.navigateBack("/places/tabs/offers");
    console.log(this.form);
  }

}
