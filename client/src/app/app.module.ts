import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// layouts
import { DashboardLayoutComponent } from './_layouts/dashboard/dashboard-layout.component';

// auth
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { AuthModule } from './auth/auth.module';

import { ApplicationErrorHandler } from './app.error-handler';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';

// shareds
import { DeleteDialogModule } from './shared/delete-dialog/delete-dialog.module';

// Material
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'eventos' }),
    AuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DeleteDialogModule,
    RouterModule.forRoot(ROUTES),
    MatMenuModule, MatSidenavModule, MatButtonModule, MatCardModule, MatToolbarModule,
    MatIconModule, MatListModule, MatSnackBarModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ApplicationErrorHandler }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
