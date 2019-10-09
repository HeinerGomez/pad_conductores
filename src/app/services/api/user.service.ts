import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import { UserOutput } from '../../converts/outputs/user-output.convert';
import { Question } from 'src/app/models/question';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User;

  constructor(private http: HttpClient) {
    this._user = null;
  }

  public get user(): User {
    return this._user;
  }

  public set user(value: User) {
    this._user = value;
  }

  public getSubscribe(idSca: number): Observable<any> {
    return this.http.get(`${environment.URL_API}/users/getIdUsers/${idSca}`);
  }

  public getUserData(userBackendId: number): Observable<any> {
    return this.http.get(`${environment.URL_API}/users/viewUser/${userBackendId}`).pipe(
      map((user: any) => {
        const _user = new User({... user.personal, ... user.security});
        this.user = user;
        return _user;
      })
    );
  }

  public updatePersonalData(data: any, user: User, userBackendId: number): Observable<any> {
    const userOutput = new UserOutput(data, user);
    const dataForAPI = userOutput.convertUserForUpdatePersonalData();
    return this.http.put(`${environment.URL_API}/subscriptions/update/${userBackendId}`, dataForAPI);
  }

  public updateChangePassword(data: any, user: User, userBackendId: number): Observable<any> {
    const userOutput = new UserOutput(data, user);
    const dataForAPI = userOutput.convertUserForChangePassword();
    return this.http.put(`${environment.URL_API}/users/update/${userBackendId}`, dataForAPI);
  }

  public forgotPassword(data: any): Observable<any> {
    const userOutput = new UserOutput(data, null);
    const dataForAPI = userOutput.convertDataForForgotPassword();
    return this.http.put(`${environment.URL_API}/users/updateForgetPasswordNotLoginApp/`, dataForAPI);
  }
  
  public getQuestions(): Observable<Question[] | Question> {
    const resourceId = 2;
    return this.http.get(`${environment.URL_API}/questions/questionsByResourceType/${resourceId}`).pipe(
      map((_questions: any) => _questions.map((_question: any) => new Question(_question))),
    );
  }

  public sendUnknownPlate(data: any): Observable<any> {
    return this.http.get(`${environment.URL_API}/drivers/sendEmailLicensePlate`, {params: data});
  }

}
