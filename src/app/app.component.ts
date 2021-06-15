import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;
  isSubmitted = false;
  @ViewChild('regForm') regForm: any;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initFormFields();
  }

  initFormFields(): void {
    this.formGroup = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(16),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(16),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('[7-9]\\d{9}'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(1)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(1)]],
    }, {
      validators: this.mustMatchValidator('password', 'confirmPassword')
    });
  }

  get f(): any {
    return this.formGroup.controls;
  }

  mustMatchValidator(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.isSubmitted = true;
    const formVal = this.formGroup.value;
    console.log(JSON.stringify(formVal));
    console.log(formVal);
  }

  onFormReset(): void {
    setTimeout(() => {
      this.isSubmitted = false;
      this.regForm.reset();
    });
  }
}
