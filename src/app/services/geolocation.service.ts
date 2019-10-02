import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private _latitude: number;
  private _longitude: number;
  private geoSubscription: Subscription;

  constructor(private geolocation: Geolocation) {
    this._longitude = 0;
    this._latitude = 0;
    this.geoSubscription = null;
  }

  public get latitude(): number {
    return this._latitude;
  }

  public set latitude(value: number) {
    this._latitude = value;
  }

  public get longitude(): number {
    return this._longitude;
  }

  public set longitude(value: number) {
    this._longitude = value;
  }

  public startObserverPosition() {
    this.geoSubscription = this.geolocation.watchPosition().subscribe(response => {
      this._latitude = response.coords.latitude;
      this._longitude = response.coords.longitude;
    }, error => console.error(error));
  }

  public stopObserverPosition() {
    if (this.geoSubscription != null) {
      this.geoSubscription.unsubscribe();
      this.geoSubscription = null;
    }
  }

  ngOnDestroy() {
    if (this.geoSubscription != null) {
      this.geoSubscription.unsubscribe();
      this.geoSubscription = null;
    }
  }

}
