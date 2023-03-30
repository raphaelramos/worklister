import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Subject} from 'rxjs';
import { takeUntil} from 'rxjs/operators';

import { AuthService } from '../../auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})

export class DashboardLayoutComponent implements OnInit, OnDestroy {
  screenObserver$ = new Subject<void>();
  isScreenXSmall: boolean;
  isDarkTheme = false;

  user: User | undefined;
  username: string | undefined;

  constructor(public router: Router,
  private authService: AuthService,
  breakpointObserver: BreakpointObserver) {
    this.isScreenXSmall = true;
    breakpointObserver
      .observe([
        Breakpoints.XSmall
      ])
      .pipe(takeUntil(this.screenObserver$))
      .subscribe((state: BreakpointState) => {
        this.isScreenXSmall = (state.matches) ? true : false;
      });
  }

  ngOnInit() {
    this.user = this.authService.getLocalUser();
    this.username = this.user.name.slice(0, 24);
  
    // Dark theme check
    if (localStorage.getItem('theme') === 'true') {
      this.isDarkTheme = true;
    }
  }

  ngOnDestroy(): void {
    this.screenObserver$.next();
    this.screenObserver$.complete();
  }

  logout() {
    this.authService.logout();
  }

  changeTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme.toString());
  }

}
