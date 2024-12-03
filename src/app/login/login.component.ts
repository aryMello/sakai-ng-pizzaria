import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from '../services/firebase-code-error.service';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { UserI } from '../UserInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  datos: UserI = {
    email: '',
    password: '',
    uid: '',
    perfil: 'visitante'
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private firebaseError: FirebaseCodeErrorService
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // You can check if the user is already authenticated on init.
    this.checkUserState();
  }

  onSubmit() {
    if (this.formLogin.invalid) {
      return;  // Prevent submission if the form is invalid
    }

    const { email, password } = this.formLogin.value;

    // Authenticate with Firebase Authentication
    this.userService.login({ email, password })
      .then(response => {
        if (response) {
          // User logged in successfully, check their role or redirect
          this.handleLoginSuccess(response.user);
        }
      })
      .catch((error) => {
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
      });
  }

  private handleLoginSuccess(user: any) {
    const userRole = this.getUserRole(user);  // Determine role, can be based on custom claims or logic
    if (userRole === 'admin') {
      this.router.navigate(['/Admin']);  // Redirect to admin page
    } else {
      this.router.navigate(['/Products']);  // Redirect to user products page
    }
  }

  private getUserRole(user: any): string {
    // If you have a custom claim, you can use it here, or determine role logic based on user email
    // For example, assuming email-based role:
    return user.email?.endsWith('@admin.com') ? 'admin' : 'visitante';
  }

  onRegisterClick() {
    this.router.navigate(['/Register']);
  }

  // Google Login handler (optional)
  onClickLoginGoogle() {
    this.userService.loginWithGoogle()
      .then(response => {
        // Optionally, handle Google login by checking user role and navigate accordingly
        const userRole = this.getUserRole(response.user);
        if (userRole === 'admin') {
          this.router.navigate(['/Admin']);
        } else {
          this.router.navigate(['/Products']);
        }
      })
      .catch(error => {
        console.error('Google login failed:', error);
        this.toastr.error('Google login failed', 'Error');
      });
  }

  private checkUserState() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already logged in, you can redirect or manage the user state
        const userRole = this.getUserRole(user);
        if (userRole === 'admin') {
          this.router.navigate(['/Admin']);
        } else {
          this.router.navigate(['/Products']);
        }
      }
    });
  }
}
