import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-offers',
  templateUrl: './tab-offers.page.html',
  styleUrls: ['./tab-offers.page.scss'],
})
export class TabOffersPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public handleTaps(route: String) {
    this.router.navigate([route]);
  }

}
