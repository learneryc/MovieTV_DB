import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-poster-card',
  templateUrl: './poster-card.component.html',
  styleUrls: ['./poster-card.component.css']
})
export class PosterCardComponent implements OnInit {

  @Input() item: any;
  @Input() type = 'movie';
  constructor() { }

  ngOnInit(): void {
    if (this.type === 'flex') {
      this.type = this.item.type;
    }
  }

}
