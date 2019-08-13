import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-introductory-page',
  templateUrl: './introductory-page.page.html',
  styleUrls: ['./introductory-page.page.scss'],
})
export class IntroductoryPagePage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  public handleTapIGetIt(): void {
    this.navController.navigateForward('/home');
  }

}
