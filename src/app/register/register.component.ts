import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase methods
import { FirebaseCodeErrorService } from '../services/firebase-code-error.service'; // Handle Firebase error codes

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formReg: FormGroup;
  datos: any = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private firebaseError: FirebaseCodeErrorService
  ) {
    this.formReg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  // Custom validator to check if passwords match
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    return group.get('password')?.value === group.get('confirmPassword')?.value
      ? null : { 'match': true };
  }

  onSubmit() {
    if (this.formReg.invalid) {
      return;
    }

    const { email, password } = this.formReg.value;
    const auth = getAuth();

    // Create user with email and password using Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        // User successfully registered
        this.toastr.success('Registration Successful!', 'Success');
        this.router.navigate(['/Products']); // Redirect after successful registration
      })
      .catch((error) => {
        // Handle error during registration
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
      });
  }
}
