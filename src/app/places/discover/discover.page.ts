import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {SegmentChangeEventDetail} from '@ionic/core';
import {PlacesService} from '../places.service';
import {Place} from '../place.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  relevantPlaces: Place[];
  private placesSub: Subscription;


  constructor(
      private placesService: PlacesService,
      private menuCtrl: MenuController,
      private authService: AuthService
  ) { }

  ngOnInit() {
   this.placesSub = this.placesService.getPlaces().subscribe(places => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
   });
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'all'){
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    } else {
      this.relevantPlaces = this.loadedPlaces.filter(
          place => place.id !== this.authService.userId
      );
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
    // console.log(event.detail);
  }

  ngOnDestroy(): void {
    if (this.placesSub){
      this.placesSub.unsubscribe();
    }
  }
}
