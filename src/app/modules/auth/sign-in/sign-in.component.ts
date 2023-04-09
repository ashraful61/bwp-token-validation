import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

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
    private authService: AuthService
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
      console.log('is success');
      this.isSubmitted = false;
      this.authService.setToken('smapletoken12333');
      this.router.navigate(['/dashboard']);
    }
  };

  forgetPassword = () => {
    this.router.navigateByUrl("/auth/forget-password")
  }

}
