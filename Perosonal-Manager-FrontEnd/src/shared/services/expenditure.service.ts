import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ExpenseRequest} from "../../add-expenditure/interfaces/expense-request";
import {Observable, Subject} from "rxjs";
import {ExpenseList} from "../../view-expenditure/Interfaces/expense-list";
import {LocalFilterParameters} from "../../view-expenditure/Interfaces/local-filter-parameters";
import {GlobalFilterParameters} from "../../view-expenditure/Interfaces/global-filter-parameters";
import {LimitedResultOfExpenseViewModel} from "../../view-expenditure/Interfaces/limited-result-of-expense-viewmodel";

@Injectable({
  providedIn: 'root'
})
export class ExpenditureService {
  private readonly headers: HttpHeaders;
  private backendBaseUrl: string = "http://localhost:5010/Expense";
  private $localFilterParameters: Subject<LocalFilterParameters> = new Subject<LocalFilterParameters>();
  private $globalFilterParameters: Subject<GlobalFilterParameters> = new Subject<GlobalFilterParameters>();
  globalFilterParameters$ = this.$globalFilterParameters.asObservable();
  localFilterParameters$ = this.$localFilterParameters.asObservable();


  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  setLocalFilterParameters(parameters: LocalFilterParameters){
    this.$localFilterParameters.next(parameters);
  }

  setGlobalFilterParameters(parameters: GlobalFilterParameters){
    this.$globalFilterParameters.next(parameters);
  }

  public add(request: ExpenseRequest): Observable<number>{
    return this.http.post<number>(`${this.backendBaseUrl}/Add`, request, {headers: this.headers})
  }

  public getLimitedExpenseList(categoryIds: number[], startDate: Date, endDate: Date, pageIndex: number, pageSize: number): Observable<LimitedResultOfExpenseViewModel>{
    let httpParams = new HttpParams()
      .append('startDate', startDate.toISOString())
      .append('endDate', endDate.toISOString())
      .append('pageIndex', pageIndex)
      .append('pageSize', pageSize);
    categoryIds.forEach((c) => httpParams =  httpParams.append('categoryIds',c.toString()));
    return this.http.get<LimitedResultOfExpenseViewModel>(`${this.backendBaseUrl}/getLimitedExpenseList`, {headers: this.headers, params: httpParams})
  }

  public getFilteredExpenseList(categoryIds: number[], startDate: Date, endDate: Date): Observable<ExpenseList[]>{
    let httpParams = new HttpParams()
      .append('startDate', startDate.toISOString())
      .append('endDate', endDate.toISOString());
    categoryIds.forEach((c) => httpParams =  httpParams.append('categoryIds',c.toString()));
    return this.http.get<ExpenseList[]>(`${this.backendBaseUrl}/getFilteredExpenseList`, {headers: this.headers, params: httpParams})
  }
}

