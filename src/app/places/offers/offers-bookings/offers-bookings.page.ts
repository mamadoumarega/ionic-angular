import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Place} from '../../place.model';
import {NavController} from '@ionic/angular';
import {PlacesService} from '../../places.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-offers-bookings',
  templateUrl: './offers-bookings.page.html',
  styleUrls: ['./offers-bookings.page.scss'],
})
export class OffersBookingsPage implements OnInit, OnDestroy {
  place: Place;
  private placeSub: Subscription;

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private placesService: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')){
        this.navCtrl.navigateBack('/places/tabs/offers');
        return ;
      }
      const placeId = paramMap.get('placeId');
      this.placeSub = this.placesService.getSinglePlace(placeId).subscribe(place => {
        this.place = place;
      });
    });
  }

  ngOnDestroy() {
    if (this.placeSub){
      this.placeSub.unsubscribe();
    }
  }

}
