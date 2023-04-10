import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  isSubmitted: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  get formErrorControl() {
    return this.signInForm.controls;
  }

  formInit = () => {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  };

  handleSignIn = () => {
    if (!this.signInForm.valid) {
      this.isSubmitted = true;
      console.log('Please provide all the required values!');
    } else {
      this.isSubmitted = false;
      this.utilitiesService.showSpinner(true);
      this.authService
        .signIn(this.signInForm.value.email, this.signInForm.value.password)
        .subscribe({
          next: (result) => {
            this.utilitiesService.showSpinner(false);
            if (result?.access_token) {
              this.authService.setToken(result?.access_token);
              this.router.navigateByUrl('/dashboard');
            }
          },
          error: (err) => {
            this.utilitiesService.showSpinner(false);
            console.log(err);
          },
        });
    }
  };

  forgetPassword = () => {
    this.router.navigateByUrl('/auth/forget-password');
  };
}
