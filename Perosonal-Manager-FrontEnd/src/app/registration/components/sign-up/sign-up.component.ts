import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegistrationService} from "../../services/registration.service";
import {SignUp} from "../../models/signUp";
import {catchError, Observable} from "rxjs";
import {ToastService} from "../../../shared/services/toast.service";
import {LoadingService} from "../../../shared/services/loading.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  loading$!: Observable<boolean>;
  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _router: Router,
              private readonly _registrationService: RegistrationService,
              private readonly _toastService: ToastService,
              private readonly _loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loading$ = this._loadingService.loading$;
    this.initForm()
  }

  initForm(){
    this.signUpForm = this._formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', Validators.required],
      'userName': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  submit(){
    let signUpRequest: SignUp = {
      firstName: this.signUpForm.get('firstName')?.value,
      lastName: this.signUpForm.get('lastName')?.value,
      email: this.signUpForm.get('email')?.value,
      userName: this.signUpForm.get('userName')?.value,
      password: this.signUpForm.get('password')?.value
    }
  this._registrationService.signUp(signUpRequest)
    .pipe(
      catchError((e: HttpErrorResponse) => {
        this._toastService.open(e.error);
        this._loadingService.setLoader(false);
        setTimeout(() => this.formGroupDirective.resetForm(), 200);
        throw e;
      })
    ).subscribe(() => {
      this._toastService.open('Success');
      this._loadingService.setLoader(false);
      this._router.navigate(['sign-in'])
  });
  }

}
