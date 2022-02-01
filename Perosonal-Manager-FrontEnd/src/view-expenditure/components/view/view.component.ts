import { Component, OnInit } from '@angular/core';
import {ExpenditureService} from "../../../shared/services/expenditure.service";
import {ExpenseList} from "../../Interfaces/expense-list";
import {catchError, Observable, of, take} from "rxjs";
import {LoadingService} from "../../../shared/services/loading.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  expenses!: ExpenseList[];
  loading$!: Observable<boolean>;
  constructor(private readonly _expenditureService: ExpenditureService, private readonly _loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loading$ = this._loadingService.loading$;
  }

  submit(formParameters: any){
    this._loadingService.setLoader(true);
    this._expenditureService.getExpenseList(formParameters.categoryId,formParameters.startDate, formParameters.endDate)
      .pipe(
        take(1),
        catchError(() => {
          this._loadingService.setLoader(false);
          return of([])})
      ).subscribe((expensesList: ExpenseList[]) => {
        this._loadingService.setLoader(false);
        this.expenses = expensesList;
    })
  }

}
