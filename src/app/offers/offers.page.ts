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
    
  }

  ngOnInit() {
    
  }

  /**
   * @description Tiene como objetivo manejar el refresh cuando se desliza la pantalla hacia arriba
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-10
   * @param void
   * @returns void
   */
  public handleSlideDownRefresh(event): void {
    setTimeout( () => {
      event.target.complete();
    }, 3000);
  }
}
