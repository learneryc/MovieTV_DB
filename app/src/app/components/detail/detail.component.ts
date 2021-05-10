import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TmdbService} from '../../services/tmdb.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {NgbAlert, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '../modal/modal.component';
import {FilmStorage} from '../../classes/film-storage';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public category: any;
  public id: any;
  public videoKey = '';
  public detail: any;
  public cast: any[] = [];
  public castEx: any;
  public reviews: any[] = [];
  public recommendation: any[] = [];
  public similar: any[] = [];
  public person: any;
  youtubeUrl = 'https://www.youtube.com/watch?v=';
  cardNum = 6;
  mediaType: any = {movie : 'Movies', tv : 'TVs'};
  watchItem: any;

  buttonInfo = ['Remove from Watchlist', 'Add to Watchlist'];
  private alertSubject = new Subject<string>();
  alertMessage = '';
  add = 1;
  alertInfo = ['Added to watchlist', 'Removed from watchlist'];
  alertType = ['success', 'danger'];
  @ViewChild('watchlistAlert', {static: false}) watchlistAlert: NgbAlert | undefined;


  constructor(private route: ActivatedRoute, private tmdbService: TmdbService, private router: Router,
              private breakpointObserver: BreakpointObserver, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category');
    this.id = this.route.snapshot.paramMap.get('id');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.detectSize();
    this.initAlert();
    this.getVideos();
    this.getDetail();
    this.getCast();
    this.getReviews();
    this.getRecommendation();
    this.getSimilar();


    // add video src api
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  detectSize(): void {
    this.breakpointObserver.observe(['(min-width: 600px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.cardNum = 6;
        } else {
          this.cardNum = 1;
        }
      });
  }

  initAlert(): void {
    this.alertSubject.subscribe(message => {
      this.alertMessage = message;
    });
    this.alertSubject.pipe(
      debounceTime(5000)).subscribe(() => {
      if (this.watchlistAlert) {
        this.watchlistAlert.close();
      }
    });
  }

  public changeWatchlist(): void {
    if (this.add === 1) {
      this.add = 0;
      FilmStorage.setStorage('watchlist', this.watchItem);
    } else {
      this.add = 1;
      FilmStorage.removeItem('watchlist', this.watchItem);
    }
    this.alertSubject.next(this.alertInfo[this.add]);
  }

  getVideos(): void {
    this.tmdbService.getVideos(this.category, this.id).subscribe(res => {
      let videos = res.results;
      for (let v of videos) {
        if (v.type == 'Trailer') {
          this.videoKey = v.key;
          return;
        }
      }

      for (let v of videos) {
        if (v.type == 'Teaser') {
          this.videoKey = v.key;
          return;
        }
      }
      this.videoKey = 'tzkWB85ULJY';
    });
  }

  getDetail(): void {
    this.tmdbService.getDetail(this.category, this.id).subscribe( res => {
      this.detail = res.results;
      if (this.category === 'tv') this.detail.release_date = 'N/A';
      this.calculateRuntime();
      this.extractGenres();
      this.extractLanguages();

      this.storeContinueWatch();
    });
  }

  getCast(): void {
    this.tmdbService.getCast(this.category, this.id).subscribe( res => {
      for (let r of res.results) {
        if (r.profile_path != 'N/A') this.cast.push(r);
      }
    });
  }

  getReviews(): void {
    this.tmdbService.getReview(this.category, this.id).subscribe( res => {
      this.reviews = res.results.slice(0, 10);
      for (let r of this.reviews) {
        if (r.rating === 'N/A') r.rating = 0;
      }
    });
  }

  getRecommendation(): void {
    this.tmdbService.getRecommendation(this.category, this.id).subscribe( res => {
      this.recommendation = res.results;
    });
  }

  getSimilar(): void {
    this.tmdbService.getSimilar(this.category, this.id).subscribe( res => {
      this.similar = res.results;
    });
  }

  calculateRuntime(): void {
    if (this.detail.runtime.length === 0 || this.detail.runtime == 'N/A') {
      this.detail.runtime = '';
      return;
    }
    if (this.category === 'tv') this.detail.runtime = this.detail.runtime[0];

    let runtimeHour = Math.floor(this.detail.runtime/60);
    let runtimeMinute = this.detail.runtime%60;
    if (runtimeHour === 0) this.detail.runtime = runtimeMinute + 'mins';
    else {
      if (runtimeMinute === 0) this.detail.runtime = runtimeHour + 'hrs';
      else this.detail.runtime = `${runtimeHour}hrs ${runtimeMinute}mins`;
    }
  }

  extractGenres(): void {
    let genres = '';
    for (let g of this.detail.genres) {
      genres += g.name + ', ';
    }
    this.detail.genres = genres.length ? genres.slice(0, -2) : genres;
  }

  extractLanguages(): void {
    let languages = '';
    for (let l of this.detail.spoken_languages) {
      languages += l.english_name + ', ';
    }
    this.detail.spoken_languages = languages.length ? languages.slice(0, -2) : languages;
  }

  storeContinueWatch(): void {
    this.watchItem = {id: this.id, type: this.category,
      poster_path: this.detail.poster_path, name: this.detail.name};
    FilmStorage.setStorage('continueWatching', this.watchItem);
    const inList = FilmStorage.itemExist('watchlist', this.watchItem);
    if (inList) {
      FilmStorage.setStorage('watchlist', this.watchItem);
      this.add = 0;
    }
  }

  popUp(person: any): void {
    this.tmdbService.getCastDetail('person', person.id).subscribe( res => {
      this.person = res.results;
      this.person.id = person.id;

      this.getCastEx();

    });
  }

  getCastEx(): void {
    this.tmdbService.getCastEx('person', this.person.id).subscribe( res => {
      this.castEx = res.results;

      const modalRef = this.modalService.open(ModalComponent,
        { centered: true, scrollable: true, size: 'lg' });
      modalRef.componentInstance.person = this.person;
      modalRef.componentInstance.castEx = this.castEx;
    });
  }
}


