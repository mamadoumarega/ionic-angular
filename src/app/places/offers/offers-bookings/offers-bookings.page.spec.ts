import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OffersBookingsPage } from './offers-bookings.page';

describe('OffersBookingsPage', () => {
  let component: OffersBookingsPage;
  let fixture: ComponentFixture<OffersBookingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersBookingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OffersBookingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
