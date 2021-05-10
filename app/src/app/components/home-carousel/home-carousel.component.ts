import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent implements OnInit {
  @Input() movie: any;
  constructor() { }

  ngOnInit(): void {
  }

}
