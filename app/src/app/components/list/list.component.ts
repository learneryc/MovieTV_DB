import { Component, OnInit } from '@angular/core';
import { FilmStorage } from '../../classes/film-storage';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  watchlist: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.watchlist = FilmStorage.getStorage('watchlist');
  }

}
