import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.route.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          let url = event.url;
          let items = document.getElementsByClassName('nav-item');
          for (let i=0; i<items.length; i++) items[i].classList.remove('active');
          if (url == '/mylist') items[1].classList.add('active');
          else if (url == '/') items[0].classList.add('active');
        }
    });
  }

}
