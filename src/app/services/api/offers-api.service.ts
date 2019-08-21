import { Injectable } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffersApiService {

  constructor(private http: HttpClient) { }


  public getOffersApplied(driverId: number): Observable<Offer[]> {
    return this.http.get(`${environment.URL_API}/offers/getMyOffer/${driverId}`).pipe(
      map((offers: any) => offers.map((offer: any) => new Offer(offer[0])))
    );
  }

  public getOffersConfirmed(driverId: number): Observable<Offer[]> {
    return this.http.get(`${environment.URL_API}/offers/getMyOffer/${driverId}?ind_confirm=1`).pipe(
      map((offers: any) => offers.map((offer: any) => new Offer(offer[0])))
    );
  }

}
