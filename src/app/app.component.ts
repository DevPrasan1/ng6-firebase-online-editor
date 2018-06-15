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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  loading = false;
  loadingSub: Subscription;
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
  closeLoader() {
    setTimeout(() => {
      this.loading = false;
    }, 10000);
  }
  ngOnInit() {
    this._loaderService.hide();
    this.loadingSub = this._loaderService.loaderStatus.subscribe((val: boolean) => {
      this.loading = val;
      if (this.loading) {
        this.closeLoader();
      }
    });
  }
  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }
}
