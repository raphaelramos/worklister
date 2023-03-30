import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError((errorResponse: HttpErrorResponse) => {
        const router = this.injector.get(Router);

        switch (errorResponse.status) {
          case 403: // Not permission
          case 419: // Session expired
            // Bounce the user to the login screen
            router.navigate(['/login']);
            break;
          case 500:
            alert('Something went wrong! Try again or contact support.');
            break;
          case 503: // Down for maintenance
            alert('We are under maintenance. Please come back later.');
            break;
        }
        // Allow individual requests to handle other errors
        return throwError(() => errorResponse);
      }));
  }

}
