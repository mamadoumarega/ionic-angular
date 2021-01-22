import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlaceDetailPageRoutingModule } from './place-detail-routing.module';
import { PlaceDetailPage } from './place-detail.page';
import {CreateBookingComponent} from '../../../bookings/create-booking/create-booking.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    // @ts-ignore
    componenent: PlaceDetailPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceDetailPageRoutingModule,
      RouterModule.forChild(routes),
  ],
  declarations: [PlaceDetailPage, CreateBookingComponent],
  entryComponents: [CreateBookingComponent]
})
export class PlaceDetailPageModule {}
