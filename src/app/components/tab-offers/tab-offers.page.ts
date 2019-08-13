import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab-offers',
  templateUrl: './tab-offers.page.html',
  styleUrls: ['./tab-offers.page.scss'],
})
export class TabOffersPage implements OnInit {

  constructor(private router: Router, private navController: NavController) { }

  ngOnInit() {
  }

  public handleTaps(route: String) {
    this.navController.navigateRoot(`${route}`);
  }

}
