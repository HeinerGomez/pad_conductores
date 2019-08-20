import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Document } from 'src/app/models/document';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentBankApiService {

  constructor(private http: HttpClient) { }


  public getDocuments(idSubscription: number): Observable<any> {
    return this.http.get(`${environment.URL_API}/subscriptions/viewDocuments/${idSubscription}`).pipe(
      map((documents: any) => documents.map((document: any) => new Document(document)))
    );
  }

  public uploadDocument(data: any) {
    console.warn("The fuck data: ", data);
    return this.http.post(`${environment.URL_API}/documentSubscription`, data);
  }

}
