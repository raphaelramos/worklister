import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private injector: Injector,
              private matSnackBar: MatSnackBar,
              private zone: NgZone) {
    super();
  }

  showMessage(message: string) {
    this.matSnackBar.open(`${message}`, '', {
      duration: 4000,
    });
  }

  override handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message;

      // console.error('Erro', errorResponse.error);
      this.zone.run(() => {
        switch (errorResponse.status) {
          case 401:
            this.showMessage(message);
            break;
          case 403:
            this.showMessage(message || 'Not authorized');
            break;
          case 404:
            this.showMessage(message || 'Not found');
            break;
          case 409:
            this.showMessage(message || 'Please try again');
            break;
        }
      });
    }
    super.handleError(errorResponse);
  }

  goToLogin(): void {
    const router = this.injector.get(Router);
    this.zone.run(
      () => router.navigate(['/login'])
    );
  }
}
