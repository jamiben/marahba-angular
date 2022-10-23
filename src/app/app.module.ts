import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HotelModule } from './hotels/hotel.module';
import { AppRoutingModule } from './app-routing.module';
import { ListHotelsComponent } from './hotels/hotel-list/list-hotels.component';
import { ReplaceComma } from './shared/pipes/replace-comma.pipe';
import { StarRatingComponent } from './shared/components/star-rating/star-rating.component';
import { HotelDetailComponent } from './hotels/hotel-detail/hotel-detail.component'
import { HotelDetailGuard } from './hotels/shared/guards/hotel-detail.guard';
import { HotelRoutingModule } from './hotels/hotel-routing.module';

registerLocaleData(localeFr, 'fr')

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // ListHotelsComponent,
    // HotelDetailComponent,
    // ReplaceComma,
    // StarRatingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,

    HotelModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
