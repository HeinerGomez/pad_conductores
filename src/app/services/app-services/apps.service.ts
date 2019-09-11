import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { App } from '../../interfaces/own/roles/app';

@Injectable({
	providedIn: 'root'
})
export class AppsService {

	app: App;
	apps: App[];

	constructor(
		private http: HttpClient
	) {}

	getApp = (): App => this.app;
	setApp = (app) => this.app = app;

	getApps = (): App[] => this.apps;
	setApps = (apps) => this.apps = apps;

	all = (): Observable<App> => {
		return this.http.get<App[]>(`${environment.SCA_URL}/ext/apps`).pipe(map((response: any) => response));
	}

	show = (id: number): Observable<App> => {
		return this.http.get<App>(`${environment.SCA_URL}/ext/apps/${id}`).pipe(map((response: any) => response));
	}

	create = (app: App): Observable<App> => {
		return this.http.post<App>(`${environment.SCA_URL}/ext/apps`, app).pipe(map((response: any) => response));
	}

	update = (app: App, id: number): Observable<App> => {
		return this.http.put<App>(`${environment.SCA_URL}/ext/apps/${id}`, app).pipe(map((response: any) => response));
	}

	delete = (appID: number): Observable<any> => {
		return this.http.delete(`${environment.SCA_URL}/ext/apps/${appID}`).pipe(map((response: any) => response));
	}

	plainModulesPerApp = (appID: number): Observable<any> => {
		return this.http.get<any>(`${environment.SCA_URL}/ext/apps/${appID}/plain-modules`).pipe(map((response: any) => response));
	}

	modulesPerApp = (appID: number): Observable<any> => {
		return this.http.get<any>(`${environment.SCA_URL}/ext/apps/${appID}/modules`).pipe(map((response: any) => response));
	}

	formattedModulesPerApp = (appID: number): Observable<any> => {
		return this.http.get<any>(`${environment.SCA_URL}/ext/apps/${appID}/formatted-modules`).pipe(map((response: any) => response));
	}

}
