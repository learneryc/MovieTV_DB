import {Component} from '@angular/core';
import {Observable, of, OperatorFunction} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {TmdbService} from '../../services/tmdb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  model: any;
  constructor(private tmdbService: TmdbService) { }

  processSearchResults(response: any): any[] {
    let res: any[] = response.results;
    let results = [];

    for (const r of res) {
      if (results.length === 7) break;
      if (r.backdrop_path !== 'N/A') results.push(r);
    }
    return results;
  }

  search: OperatorFunction<string, readonly any[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      //distinctUntilChanged(),
      //tap(() => this.searching = true),
      switchMap(term =>
        this.tmdbService.getSearchResults(term).pipe(
          map((res) => this.processSearchResults(res)),
          catchError((e) => {
            console.log(e);
            return of([]);
          }))
      )
      //tap(() => this.searching = false)
    )

  formatter = (x: {name: string}) => '';
}
