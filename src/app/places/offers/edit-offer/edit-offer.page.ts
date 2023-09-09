import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place !: Place; 

  constructor(
    private activatedRoute : ActivatedRoute,
    private placesService : PlacesService,
    private navCtrl : NavController
  ) { }

  ngOnInit() {
    //with acivatedRouted automatically update, because subscribtion listen to changes in the urls will always be live
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has("placeId")){
        //redirecting
        this.navCtrl.navigateBack("/places/tabs/offers");
        return;
      }

      const placeid = paramMap.get('placeId');
      if (placeid !== null){
        this.place = this.placesService.getPlace(placeid);
      }  
    });
  }

}
