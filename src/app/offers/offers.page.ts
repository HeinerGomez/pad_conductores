import { Component, OnInit } from '@angular/core';
import { StorageDataService } from '../services/storage-data.service';
import { UserInSession } from '../interfaces/own/userInSession.interf';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  
  public inSession: any;

  constructor(private storageDataService: StorageDataService, private activatedRoute: ActivatedRoute, 
              private utilitiesService: UtilitiesService) { 
    console.log('Constructor de ofertas');
    this.storageDataService.getUserInSession().then( (user: UserInSession) => {
      this.inSession = user;
    });
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.activatedRoute.params.subscribe( params => {
      console.log(params);
      if (params.hasOwnProperty('shouldSessionMessage')) {
        this.utilitiesService.showSnackbar('Bienvenido de vuelta al PAD');
      }
    });
  }
}
