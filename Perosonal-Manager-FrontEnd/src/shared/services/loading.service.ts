import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _$loading = new BehaviorSubject<boolean>(false);
  public loading$ = this._$loading.asObservable();

  setLoader(value: boolean) {
    this._$loading.next(value);
  }
}
