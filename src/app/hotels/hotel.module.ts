import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ListHotelsComponent } from './hotel-list/list-hotels.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { SharedModule } from '../shared/shared.module';
import { HotelRoutingModule } from './hotel-routing.module';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../shared/components/star-rating/star-rating.component';
import { ReplaceComma } from '../shared/pipes/replace-comma.pipe';
import { RouterModule } from '@angular/router';
import { HotelDetailGuard } from './shared/guards/hotel-detail.guard';
import { FormsModule } from '@angular/forms';
import { HotelData } from './shared/api/hotel.data';



@NgModule({
  declarations: [
    ListHotelsComponent,
    HotelDetailComponent,
    HotelEditComponent,
    // StarRatingComponent,
    // ReplaceComma
  ],
  imports: [
//CommonModule ==> Permet l'acces au "ngIf & ngFor"
    // CommonModule,
    // FormsModule,
    SharedModule,
    HotelRoutingModule,
    InMemoryWebApiModule.forFeature(HotelData)
  ]
})
export class HotelModule { }
