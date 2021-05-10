import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.css']
})
export class CardCarouselComponent implements OnInit, OnChanges {
  @Input() cardNum = 6;
  @Input() type = 'movie';
  @Input() items: any[] = [];

  public pages: any[] = [];
  public showNavigationIndicators = true;
  public showNavigationArrows = true;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    let pages = [];
    for (let i=0; i<this.items.length; i+=this.cardNum) {
      let page = [];
      for (let j=i; j<i+this.cardNum && j<this.items.length; j++) {
        page.push(this.items[j]);
      }
      pages.push(page);
    }
    this.pages = pages;

    // if there are more pages, display arrows and indicators.
    this.showNavigationIndicators = this.pages.length > 1;
    this.showNavigationArrows = this.pages.length > 1;

    // if mobile version, don't display indicators
    if (this.cardNum == 1) this.showNavigationIndicators = false;
  }

}
