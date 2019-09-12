import { Injectable } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import { Question } from 'src/app/models/question';

@Injectable({
  providedIn: 'root'
})
export class OffersApiService {

  constructor(private http: HttpClient) { }

  public getOffersAvailable(): Observable<Offer[]> {
    return this.http.get(`${environment.URL_API}/offers/getOffersAvailable`).pipe(
      map((offers: any) => {
        if (offers.length) {
          return offers[0].map((offer: any) => new Offer(offer));
        }
        return [];
      })
    );
  }

  public getOffersApplied(driverId: number): Observable<Offer[]> {
    return this.http.get(`${environment.URL_API}/offers/getMyOffer/${driverId}`).pipe(
      map((offers: any) => {
        if (offers.length) {
          return offers.map((offer: any) => new Offer(offer[0]));
        }
        return [];
      })
    );
  }

  public getOffersConfirmed(driverId: number): Observable<Offer[]> {
    return this.http.get(`${environment.URL_API}/offers/getMyOffer/${driverId}?ind_confirm=1`).pipe(
      map((offers: any) => {
        if (offers.length) {
          return offers.map((offer: any) => new Offer(offer[0]));
        }
        return [];
      })
    );
  }

  public getOffersPerQualification(driverId: number): Observable<Offer[]> {
    return this.http.get(`${environment.URL_API}/offers/getMyOffer/${driverId}?ind_confirm=2`).pipe(
      map((offers: any) => {
        if (offers.length) {
          return offers.map((offer: any) => new Offer(offer[0]));
        }
        return [];
      })
    );
  }

  public cancelOrAppliedOffer(data: any): Observable<any> {
    return this.http.post(`${environment.URL_API}/offers/driver`, data);
  }

  public fullfilledOffer(data: any): Observable<any> {
    return this.http.post(`${environment.URL_API}/offers/confirmDriverCompliment`, data);
  }

  public getDependencies(): Observable<any> {
    const resourceId = 0; // preguntas de calificacion de la oferta
    return this.http.get(`${environment.URL_API}/questions/questionsByResourceType/${resourceId}`).pipe(
      map((_questions: any) => _questions.map((_question: any) => new Question(_question))),
    );
  }

}
