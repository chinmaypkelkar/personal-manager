import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private authToken!: string | null;
  private $authToken: Subject<string> = new Subject<string>();
  authToken$: Observable<string> = this.$authToken.asObservable();

  constructor() { }

  getToken(): string | null{
    return localStorage.getItem('accessToken');
  }

  setToken(token: string){
    this.$authToken.next(token);
    localStorage.setItem("accessToken", token);
  }

}
