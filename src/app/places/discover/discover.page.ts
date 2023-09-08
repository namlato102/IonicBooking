import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  loadedPlaces !: Place[];

  constructor(private placesService : PlacesService) { }

  ngOnInit() {
    this.loadedPlaces = this.placesService.places;
  }

}
