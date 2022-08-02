import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new Subject<boolean>();

  // show lodder while loading App or caliing API
  show() {
    this.isLoading.next(true);
  }

  // Hide Loadder after success in Api call or App Load
  hide() {
    this.isLoading.next(false);
  }
}
