import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilitiesService } from '../utilities.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private router: Router,
    private utilsService: UtilitiesService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(error => {

      switch (error.status) {

        case 401:
          // TODO AUTH
          break;

        case 400:
        case 422:
          this.utilsService.showSnackbar('Ha ocurrido un error interno', 'danger');
          break;

        case 500:
          this.utilsService.showSnackbar('No hemos podido establecer comunicación con nuestros servidores', 'danger');
          break;
      }

      return throwError(error.error);

    }));

  }

}