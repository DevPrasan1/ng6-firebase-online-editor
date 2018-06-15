import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public loaderStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  show() {
    this.loaderStatus.next(true);
  }
  hide() {
    this.loaderStatus.next(false);
  }
}
