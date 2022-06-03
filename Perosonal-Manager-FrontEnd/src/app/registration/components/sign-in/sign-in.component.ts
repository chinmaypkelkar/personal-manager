import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegistrationService} from "../../services/registration.service";
import {catchError, Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastService} from "../../../shared/services/toast.service";
import {LoadingService} from "../../../shared/services/loading.service";
import {AuthorizationService} from "../../../shared/services/authorization.service";
import {Token} from "../../models/token";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  loading$!: Observable<boolean>;
  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _router: Router,
              private readonly _registrationService: RegistrationService,
              private readonly _toastService: ToastService,
              private readonly _loadingService: LoadingService,
              private readonly _authService: AuthorizationService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.loading$ = this._loadingService.loading$;
    this.signInForm = this._formBuilder.group({
      'userName': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  submit(){
    let userName: string = this.signInForm.get('userName')?.value;
    let password: string = this.signInForm.get('password')?.value;
    this._registrationService.signIn(userName, password)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          this._toastService.open(e.error);
          this._loadingService.setLoader(false);
          setTimeout(() => this.formGroupDirective.resetForm(), 200);
          throw e;
        })
      ).subscribe((token: Token) => {
      this._loadingService.setLoader(false);
      this._authService.setToken(token.token);
      this._router.navigate(['add-expense']);
    });

  }

}
