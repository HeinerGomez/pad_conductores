import { Component, OnInit } from '@angular/core';
import { StorageDataService } from '../services/storage-data.service';
import { UserInSession } from '../interfaces/own/userInSession.interf';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  
  public inSession: any;

  constructor(private storageDataService: StorageDataService) { 
    this.storageDataService.getUserInSession().then( (user: UserInSession) => {
      this.inSession = user;
    });
  }

  ngOnInit() {
  }
}
