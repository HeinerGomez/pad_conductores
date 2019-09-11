import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getSubscribe(idSca: number): Observable<any> {
    return this.http.get(`${environment.URL_API}/users/getIdUsers/${idSca}`);
  }

}
