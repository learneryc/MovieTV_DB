import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cast-card',
  templateUrl: './cast-card.component.html',
  styleUrls: ['./cast-card.component.css']
})
export class CastCardComponent implements OnInit {

  @Input() cast: any;
  constructor() { }

  ngOnInit(): void {
  }

}
