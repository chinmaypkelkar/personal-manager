import {Component, OnInit} from '@angular/core';
import {TabItem} from "./tab-item";
import {AuthorizationService} from "./shared/services/authorization.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  internalTabs: TabItem[];
  externalTabs: TabItem[];

  token$!: Observable<string | null>;

  constructor(private readonly _authorizationService: AuthorizationService) {
    this.externalTabs = [{ label : 'Sign In',
      route : '/sign-in'},
      {label : 'Sign Up',
      route : '/sign-up'}];

    this.internalTabs = [{
      label : 'Add Expense',
      route : '/add-expense'
    },
      {
        label : 'View Expenses',
        route : '/view-expense'
      },
      {
        label : 'Add ToDo',
        route : '/add-todo'
      },
      {
        label : 'View ToDo',
        route : '/view-todo'
      }];
  }

  ngOnInit(): void {
    this.token$ = this._authorizationService.authToken$;
  }
}
