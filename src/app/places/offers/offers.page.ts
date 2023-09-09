import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  
  offers !: Place[];
  constructor(
    private placesService : PlacesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.offers = this.placesService.places;
  }

  onEdit(offerId: string | undefined, slidingItem: IonItemSliding) {
    slidingItem.close(); //for sliding auto close when navigate back
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit-offer', offerId]);
    console.log('Editing item', offerId);
  }
  

}
