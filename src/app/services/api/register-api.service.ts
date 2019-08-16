import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question';
import { Configuration } from 'src/app/models/configuration';
import { RegisterOutput } from 'src/app/converts/outputs/register-output.convert';

@Injectable({
  providedIn: 'root'
})
export class RegisterApiService {

  private _dependencies: any[];

  constructor(private http: HttpClient) {
    this._dependencies = [];
  }

  public getDependencies(): Observable<any> {
    const resourceId = 2;
    return this.http.get(`${environment.URL_API}/questions/questionsByResourceType/${resourceId}`).pipe(
      map((_questions: any) => _questions.map((_question: any) => new Question(_question))),
    );
  }

  public getConfigurations(): Observable<any> {
    return this.http.get(`${environment.URL_API}/configurations`).pipe(
      map((_configurations: any) => _configurations.data.map((_configuration: any) => new Configuration(_configuration)))
    );
  }

  public createRequestRegister(data: any): Observable<any> {
    const registerOutput = new RegisterOutput(data);
    const convertedData = registerOutput.convertRegisterForRequestAPI();
    return this.http.post(`${environment.URL_API}/subscriptions`, convertedData);
  }

  

}
