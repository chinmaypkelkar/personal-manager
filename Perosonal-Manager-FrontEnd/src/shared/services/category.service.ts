import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../add-expenditure/interfaces/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly headers: HttpHeaders;
  private backendBaseUrl: string = "http://localhost:5010";
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.backendBaseUrl + '/Category/GetCategories', {headers: this.headers});
  }
}
