import { Injectable } from '@angular/core';
import { DataDependencyObservable } from './observables/data-dependency.observable';

@Injectable({
  providedIn: 'root'
})
export class DynamicBadgeService {

  private _badgeOffersAvailable: number;
  private _badgeMyOffers: number;
  private _badgeOffersArchivated: number;

  constructor(private dataDependencyObservable: DataDependencyObservable) {
    this._badgeMyOffers = 0;
    this._badgeOffersAvailable = 0;
    this._badgeOffersArchivated = 0;
  }

  public get offersAvailable(): number {
    return this._badgeOffersAvailable;
  }

  public set offersAvailable(value: number) {
    this._badgeOffersAvailable = value;
    this.dataDependencyObservable.set(true);
  }

  public get badgeMyOffers(): number {
    return this._badgeMyOffers;
  }

  public set badgeMyOffers(value: number) {
    console.log("____este es el value: ", value);
    this._badgeMyOffers = value;
    this.dataDependencyObservable.set(true);
  }

  public get badgeOffersArchivated(): number {
    return this._badgeOffersArchivated;
  }

  public set badgeOffersArchivated(value: number) {
    this._badgeOffersArchivated = value;
    this.dataDependencyObservable.set(true);
  }

}
