import { Component, OnInit } from '@angular/core';
import {TmdbService} from '../../services/tmdb.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {FilmStorage} from '../../classes/film-storage';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public continueWatching: any[] = [];
  public nowPlayingMovies: any[] = [];
  public popularMovies: any[] = [];
  public topRatedMovies: any[] = [];
  public trendingMovies: any[] = [];
  public popularTvs: any[] = [];
  public topRatedTvs: any[] = [];
  public trendingTvs: any[] = [];
  cardNum = 6;

  constructor(private tmdbService: TmdbService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.detectSize();
    this.getContinueWatching();
    this.getCurrentMovies();
    this.getPopularMovies();
    this.getTopRatedMovies();
    this.getTrendingMovies();
    this.getPopularTvs();
    this.getTopRatedTvs();
    this.getTrendingTvs();
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

  getContinueWatching(): void {
    this.continueWatching = FilmStorage.getStorage('continueWatching');
  }

  getCurrentMovies(): void {
    this.tmdbService.getCurrentMovies().subscribe(res => {
      for (const r of res.results) {
        if (this.nowPlayingMovies.length === 5) break;
        if (r.backdrop_path !== 'N/A') {
          this.nowPlayingMovies.push(r);
        }
      }
    });
  }

  getPopularMovies(): void {
    this.tmdbService.getPopularMovies().subscribe(res => {
      this.popularMovies = res.results;
    });
  }

  getTopRatedMovies(): void {
    this.tmdbService.gettopRatedMovies().subscribe( res => {
      this.topRatedMovies = res.results;
    });
  }

  getTrendingMovies(): void {
    this.tmdbService.getTrendingMovies().subscribe( res => {
      this.trendingMovies = res.results;
    });
  }

  getPopularTvs(): void {
    this.tmdbService.getPopularTvs().subscribe(res => {
      this.popularTvs = res.results;
    });
  }

  getTopRatedTvs(): void {
    this.tmdbService.gettopRatedTvs().subscribe( res => {
      this.topRatedTvs = res.results;
    });
  }

  getTrendingTvs(): void {
    this.tmdbService.getTrendingTvs().subscribe( res => {
      this.trendingTvs = res.results;
    });
  }

}
