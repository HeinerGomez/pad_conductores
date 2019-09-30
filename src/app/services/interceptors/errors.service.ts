import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilitiesService } from '../utilities.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private router: Router,
    private utilsService: UtilitiesService,
    private _authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => {
      let messageError = 'Ha ocurrido un error interno';
      switch (error.status) {
        case 401:
          this._authService.logout();
          messageError = error.error.error;
          this.utilsService.showSnackbar(messageError, 'danger');
          break;

        case 400:
        case 422:
          console.log("Error intercepter: ", error);
          messageError = error.error.error.message;
          this.utilsService.showSnackbar(messageError, 'danger');
          break;
        case 500:
          console.log("Error intercepter: ", error);
          this.utilsService.showSnackbar('No hemos podido establecer comunicación con nuestros servidores', 'danger');
          break;
      }
      return throwError(error.error);
    }));
  }
}