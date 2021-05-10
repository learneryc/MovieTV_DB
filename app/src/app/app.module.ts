import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { SearchComponent } from './components/search/search.component';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeCarouselComponent } from './components/home-carousel/home-carousel.component';
import { CardCarouselComponent } from './components/card-carousel/card-carousel.component';
import { CardComponent } from './components/card/card.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { CastCardComponent } from './components/cast-card/cast-card.component';
import { ReviewComponent } from './components/review/review.component';
import { ModalComponent } from './components/modal/modal.component';
import { PosterCardComponent } from './components/poster-card/poster-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavBarComponent,
    ListComponent,
    DetailComponent,
    SearchComponent,
    HomeCarouselComponent,
    CardCarouselComponent,
    CardComponent,
    CastCardComponent,
    ReviewComponent,
    ModalComponent,
    PosterCardComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgbModule,
        HttpClientModule,
        YouTubePlayerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
