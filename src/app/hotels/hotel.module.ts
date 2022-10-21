import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListHotelsComponent } from './hotel-list/list-hotels.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { StarRatingComponent } from '../shared/components/star-rating/star-rating.component';
import { ReplaceComma } from '../shared/pipes/replace-comma.pipe';
import { RouterModule } from '@angular/router';
import { HotelDetailGuard } from './shared/guards/hotel-detail.guard';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HotelRoutingModule } from './hotel-routing.module';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';



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
    HotelRoutingModule
  ]
})
export class HotelModule { }
