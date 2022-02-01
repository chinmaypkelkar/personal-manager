import {Component, OnInit, ViewChild} from '@angular/core';
import {ExpenditureService} from "../../../shared/services/expenditure.service";
import {CategoryService} from "../../../shared/services/category.service";
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {catchError, Observable, of} from "rxjs";
import {Category} from "../../interfaces/category";
import {ExpenseRequest} from "../../interfaces/expense-request";
import {LoadingService} from "../../../shared/services/loading.service";
import {ToastService} from "../../../shared/services/toast.service";

@Component({
  selector: 'app-add-expense-form',
  templateUrl: './add-expense-form.component.html',
  styleUrls: ['./add-expense-form.component.css']
})
export class AddExpenseFormComponent implements OnInit {

  expenseForm!: FormGroup;
  categories$!: Observable<Category[]>;
  loading$!: Observable<boolean>;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  constructor(private readonly _expenditureService: ExpenditureService,
              private readonly _categoryService: CategoryService,
              private readonly _loadingService: LoadingService,
              private readonly _toastService: ToastService,
              private readonly _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loading$ = this._loadingService.loading$;
    this.initForm();
    this.categories$ = this._categoryService.getCategories();
  }

  initForm(){
  this.expenseForm = this._formBuilder.group({
    category: [null, Validators.required],
    expense: ['', Validators.required],
    amount: [null, Validators.required],
    createdDate: [null, Validators.required]
  })
  }

  submit(){
    let expenseRequest: ExpenseRequest = {
      categoryId: this.expenseForm.get('category')?.value,
      expense: this.expenseForm.get('expense')?.value,
      amount: +this.expenseForm.get('amount')?.value,
      createdDate: this.expenseForm.get('createdDate')?.value
    }
    this._loadingService.setLoader(true);
   this._expenditureService.add(expenseRequest)
     .pipe(
       catchError(() => {
         this._toastService.open('Error in sending request');
         this._loadingService.setLoader(false);
         setTimeout(() => this.formGroupDirective.resetForm(), 200);
         return of(null);

       })
     ).subscribe((value) => {
       if(value){
         this._toastService.open('Success');
         this._loadingService.setLoader(false);
         setTimeout(() => this.formGroupDirective.resetForm(), 200);
       }
   } )
  }

}
