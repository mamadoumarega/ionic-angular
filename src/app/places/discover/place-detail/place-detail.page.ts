import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActionSheetController, LoadingController, ModalController, NavController} from '@ionic/angular';
import {CreateBookingComponent} from '../../../bookings/create-booking/create-booking.component';
import {Place} from '../../place.model';
import {PlacesService} from '../../places.service';
import {Subscription} from 'rxjs';
import {BookingService} from '../../../bookings/booking.service';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  private placeSub: Subscription;
  isBookable = false;

  constructor(
      private route: ActivatedRoute,
      private navCtrl: NavController,
      private modalCtrl: ModalController,
      private placesService: PlacesService,
      private actionSheetCtrl: ActionSheetController,
      private bookingService: BookingService,
      private loadingCtrl: LoadingController,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      if (!paramMap.has('placeId')){
        this.navCtrl.navigateBack('/places/tabs/discover');
        return ;
      }
      this.placeSub = this.placesService.getSinglePlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
        this.isBookable = place.userId !== this.authService.userId;
      });
    });
  }

  onBookPlace() {
    // this.router.navigateByUrl('places/tabs/discover');
    // this.navCtrl.navigateBack('places/tabs/discover');
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
        .then(actionSheetEl => {
          actionSheetEl.present();
        });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: { selectedPlace: this.place, selectedMode: mode },
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
        .then(resultData => {
          const data = resultData.data.bookingData;
          if (resultData.role === 'confirm'){
            this.loadingCtrl.create({
              message: 'Booking place ....'
            }).then(loadingEl => {
              loadingEl.present();
              this.bookingService.addBooking
              (
                  this.place.id,
                  this.place.title,
                  this.place.imageUrl,
                  data.firstName,
                  data.lastName,
                  data.guestNumber,
                  data.startDate,
                  data.endDate
              ).subscribe(() => {
                loadingEl.dismiss();
              });
            });
          }
        });
  }
  ngOnDestroy() {
    if (this.placeSub){
      this.placeSub.unsubscribe();
    }
  }
}
