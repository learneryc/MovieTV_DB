import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private host = 'http://127.0.0.1:5000';
  constructor(private httpClient: HttpClient) { }

  getCurrentMovies(): Observable<any> {
    let url = this.host + '/api/movie/nowPlaying';
    return this.httpClient.get(url);
  }

  getPopularMovies(): Observable<any> {
    let url = this.host + '/api/movie/popular';
    return this.httpClient.get(url);
  }

  gettopRatedMovies(): Observable<any> {
    let url = this.host + '/api/movie/top';
    return this.httpClient.get(url);
  }

  getTrendingMovies(): Observable<any> {
    let url = this.host + '/api/movie/trending';
    return this.httpClient.get(url);
  }

  getPopularTvs(): Observable<any> {
    let url = this.host + '/api/tv/popular';
    return this.httpClient.get(url);
  }

  gettopRatedTvs(): Observable<any> {
    let url = this.host + '/api/tv/top';
    return this.httpClient.get(url);
  }

  getTrendingTvs(): Observable<any> {
    let url = this.host + '/api/tv/trending';
    return this.httpClient.get(url);
  }

  getRecommendation(type:any, id:any): Observable<any> {
    let url = this.host + '/api/' + type + '/recommend/' + id;
    return this.httpClient.get(url);
  }

  getSimilar(type:any, id:any): Observable<any> {
    let url = this.host + '/api/' + type + '/similar/' + id;
    return this.httpClient.get(url);
  }

  getVideos(type:any, id:any): Observable<any> {
    let url = this.host + '/api/' + type + '/video/' + id;
    return this.httpClient.get(url);
  }

  getDetail(type:any, id:any): Observable<any> {
    let url = this.host + '/api/' + type + '/detail/' + id;
    return this.httpClient.get(url);
  }

  getReview(type:any, id:any): Observable<any> {
    let url = this.host + '/api/' + type + '/review/' + id;
    return this.httpClient.get(url);
  }

  getCast(type:any, id:any): Observable<any> {
    let url = this.host + '/api/' + type + '/cast/' + id;
    return this.httpClient.get(url);
  }

  getCastDetail(type:any, id:any): Observable<any> {
    let url = this.host + '/api/' + type + '/castDetail/' + id;
    return this.httpClient.get(url);
  }

  getCastEx(type:any, id:any): Observable<any> {
    let url = this.host + '/api/' + type + '/castEx/' + id;
    return this.httpClient.get(url);
  }

  getSearchResults(query:any): Observable<any> {
    query = query.trim();
    if (query.length === 0) return of([]);
    let url = this.host + '/search/' + encodeURIComponent(query);
    return this.httpClient.get(url);
  }

}
