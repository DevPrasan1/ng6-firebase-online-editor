import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  ChildActivationStart,
  ChildActivationEnd,
  GuardsCheckStart,
  GuardsCheckEnd,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from './common';
import { setCustomTheme } from './common/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  loading = false;
  loadingSub: Subscription;
  theme = 'dark-theme';
  constructor(private _router: Router, private _loaderService: LoaderService) {
    _router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }
  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (
      event instanceof NavigationStart ||
      event instanceof ChildActivationStart ||
      event instanceof GuardsCheckStart
    ) {
      this.loading = true;
    }
    if (
      event instanceof NavigationEnd ||
      event instanceof NavigationError ||
      event instanceof NavigationCancel ||
      event instanceof ChildActivationEnd ||
      event instanceof GuardsCheckEnd
    ) {
      this.loading = false;
    }
  }
  selectTheme(theme) {
    // this.theme = theme;
    if (theme === 'dark-theme') {
      setCustomTheme('#1c2022');
    } else {
      setCustomTheme('#eeeeee');
    }
  }
  setTheme(event) {
    setCustomTheme(event.target.value);
  }
  ngOnInit() {
    setCustomTheme();
    this.loadingSub = this._loaderService.loaderStatus.subscribe((val: boolean) => {
      this.loading = val;
    });
  }
  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }
}
