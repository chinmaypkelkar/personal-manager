import { Component, OnInit } from '@angular/core';
import {ExpenditureService} from "../../../shared/services/expenditure.service";
import {ExpenseList} from "../../Interfaces/expense-list";
import {catchError, combineLatest, Observable, switchMap, take, tap} from "rxjs";
import {LoadingService} from "../../../shared/services/loading.service";
import {LocalFilterParameters} from "../../Interfaces/local-filter-parameters";
import {LimitedResultOfExpenseViewModel} from "../../Interfaces/limited-result-of-expense-viewmodel";
import {GlobalFilterParameters} from "../../Interfaces/global-filter-parameters";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  expenses!: ExpenseList[];
  loading$!: Observable<boolean>;
  localFilterParameters$!: Observable<LocalFilterParameters>;
  globalFilterParameters$!: Observable<GlobalFilterParameters>;
  expenseList$!: Observable<ExpenseList[]>;
  limitedExpenseList$!: Observable<LimitedResultOfExpenseViewModel>;

  constructor(private readonly _expenditureService: ExpenditureService, private readonly _loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loading$ = this._loadingService.loading$;
    this.localFilterParameters$ = this._expenditureService.localFilterParameters$;
    this.globalFilterParameters$ = this._expenditureService.globalFilterParameters$;

    this.limitedExpenseList$ = combineLatest([this.globalFilterParameters$, this.localFilterParameters$])
      .pipe(
        switchMap(([globalFilterParameters, localFilterParameters]) => {
          return this._expenditureService.getLimitedExpenseList(globalFilterParameters.categoryIds, globalFilterParameters.startDate, globalFilterParameters.endDate, localFilterParameters.pageIndex, localFilterParameters.pageSize)
            .pipe(
              tap(() => this._loadingService.setLoader(false)),
              catchError((err) => {
                this._loadingService.setLoader(false);
                throw err;
              }))
        })
      )

    this.expenseList$ = this.globalFilterParameters$.pipe(
      switchMap((globalFilterParameters: GlobalFilterParameters) => {
        return this._expenditureService.getFilteredExpenseList(globalFilterParameters.categoryIds, globalFilterParameters.startDate, globalFilterParameters.endDate)
          .pipe(
            tap(() => this._loadingService.setLoader(false)),
            catchError((err) => {
                this._loadingService.setLoader(false);
                throw err;
            }))
      })
    )
  }

  submit(globalFilterParameters: any){
    this._loadingService.setLoader(true);
    this._expenditureService.setGlobalFilterParameters(globalFilterParameters);
    this._expenditureService.setLocalFilterParameters(new LocalFilterParameters());
  }

  onPageChange(localParameters: LocalFilterParameters){
    this._loadingService.setLoader(true);
    this._expenditureService.setLocalFilterParameters(localParameters);
  }

}
