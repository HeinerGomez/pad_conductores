import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PersonalDataModalPage } from '../personal-data-modal/personal-data-modal.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  public async handleTapButtonPersonalData() {
    const modal = await this.modalController.create({
      'component': PersonalDataModalPage,
      'componentProps': {}
    });
    modal.present();
  }

}
