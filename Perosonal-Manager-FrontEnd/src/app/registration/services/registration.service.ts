import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {SignUp} from "../models/signUp";
import {Observable} from "rxjs";
import {Token} from "../models/token";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private readonly headers: HttpHeaders;
  private backendBaseUrl: string = "http://localhost:5010";
  private signUpUrl: string = "/Person/SignUp";
  private signInUrl: string = "/Person/SignIn"
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public signUp(signUpRequest: SignUp){
    return this.http.post(this.backendBaseUrl + this.signUpUrl, signUpRequest, {headers: this.headers});
  }

  public signIn(userName: string, password: string): Observable<Token>{
    let httpParams = new HttpParams()
      .append('userName', userName)
      .append('password', password)
    return this.http.get<Token>(this.backendBaseUrl + this.signInUrl, {headers: this.headers, params: httpParams, responseType: 'json'})
  }
}
