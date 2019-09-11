import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DynamicBadgeService } from 'src/app/services/dynamic-badge.service';
import { DataDependencyObservable } from 'src/app/services/observables/data-dependency.observable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab-offers',
  templateUrl: './tab-offers.page.html',
  styleUrls: ['./tab-offers.page.scss'],
})
export class TabOffersPage implements OnInit, OnDestroy, DoCheck {

  public badgeMyOffers: number;
  public badgeOffers: number;
  public badgeOffersArchivated: number;
  private observableDataDependency: Subscription;

  constructor(
    private router: Router, private navController: NavController,
    private dynamicBadgeService: DynamicBadgeService, 
    private dataDependencyObservable: DataDependencyObservable
  ) { }

  ngOnInit() {
    
  }

  ngDoCheck() {
    this.observableDataDependency = this.dataDependencyObservable.watch().subscribe((shouldGet: boolean) => {
      if (shouldGet) {
        this.badgeOffers = this.dynamicBadgeService.offersAvailable;
        this.badgeMyOffers = this.dynamicBadgeService.badgeMyOffers;
        this.badgeOffersArchivated = this.dynamicBadgeService.badgeOffersArchivated;
      }
    });
  }

  public handleTaps(route: String) {
    this.navController.navigateRoot(`${route}`);
  }

  ngOnDestroy() {
    this.observableDataDependency.unsubscribe();
    this.dataDependencyObservable.reset();
  }

}
