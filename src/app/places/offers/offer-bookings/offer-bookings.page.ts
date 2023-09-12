import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {

  place !: Place;
  placeSub !: Subscription;
 

  //activeedRouted allow to subscribe to changes to route params in the url,
  //which id where i store the dynamic segment
  constructor(
    private activatedRoute : ActivatedRoute,
    private navCtrl : NavController,
    private placesService : PlacesService
    ) { }

    

  ngOnInit() {
    //with acivatedRouted automatically update, because subscribtion listen to changes in the urls will always be live
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has("placeId")){
        //redirecting
        this.navCtrl.navigateBack("/places/tabs/offers");
        return;
      }

      
      const placeId = paramMap.get('placeId');
      if (placeId != null) {
        this.placeSub = this.placesService.getPlace(placeId).subscribe(place => {
          this.place = place
        });
      } 
    });
  }

  ngOnDestroy() {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }      
  }

}
