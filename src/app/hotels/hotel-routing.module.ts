import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelDetailGuard } from './shared/guards/hotel-detail.guard';
import { ListHotelsComponent } from './hotel-list/list-hotels.component';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'hotels/:id', component: HotelDetailComponent,
        canActivate: [HotelDetailGuard]
      },
      {path: 'hotels', component: ListHotelsComponent},
      {path : 'hotels/:id/edit', component: HotelEditComponent},
    ]),
  ],
  exports:[ RouterModule ]
})
export class HotelRoutingModule { }
