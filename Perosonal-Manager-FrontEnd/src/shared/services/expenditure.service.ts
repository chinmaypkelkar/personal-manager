import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ExpenseRequest} from "../../add-expenditure/interfaces/expense-request";
import {Observable} from "rxjs";
import {ExpenseList} from "../../view-expenditure/Interfaces/expense-list";

@Injectable({
  providedIn: 'root'
})
export class ExpenditureService {
  private readonly headers: HttpHeaders;
  private backendBaseUrl: string = "http://localhost:5010/Expense";
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public add(request: ExpenseRequest): Observable<number>{
    return this.http.post<number>(`${this.backendBaseUrl}/Add`, request, {headers: this.headers})
  }

  public getExpenseList(categoryIds: number[], startDate: Date, endDate: Date): Observable<ExpenseList[]>{
    let httpParams = new HttpParams()
      .append('startDate', startDate.toISOString())
      .append('endDate', endDate.toISOString());
    categoryIds.forEach((c) => httpParams =  httpParams.append('categoryIds',c.toString()));
    return this.http.get<ExpenseList[]>(`${this.backendBaseUrl}/GetExpenseList`, {headers: this.headers, params: httpParams})
  }
}

