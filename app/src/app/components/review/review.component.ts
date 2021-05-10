import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() review: any;
  date: any;
  constructor() { }

  ngOnInit(): void {
    if (this.review.created_at !== 'N/A')
      this.date = new Date(this.review.created_at.slice(0, 10)
        + ' ' + this.review.created_at.slice(11, 19));
  }

}
