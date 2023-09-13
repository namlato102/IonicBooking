import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  
  offers !: Place[];
  private placeSub !: Subscription;
  isLoading = false; //for spinner

  constructor(
    private placesService : PlacesService,
    private router: Router,
    private loadingCtrl : LoadingController
  ) { }

  ngOnInit() {
    //this.offers = this.placesService.places;
    //when i comment dummy place it will not use
    this.placeSub = this.placesService.places.subscribe(places => {
      this.offers = places; 
    });
  }

  ionViewWillEnter(){
    this.isLoading = true;
    //subcriber to that obsevable
    this.placesService.fetchPlace().subscribe(res => {
      console.log(res);
      this.isLoading = false;
    });
  }

  onEdit(offerId: string | undefined, slidingItem: IonItemSliding) {
    slidingItem.close(); //for sliding auto close when navigate back
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit-offer', offerId]);
    console.log('Editing item', offerId);
  }
  
  ngOnDestroy() {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }      
  }

}
