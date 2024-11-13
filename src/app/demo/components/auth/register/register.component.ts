import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
    }
  `]
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {}

  async registerUser() {
    if (this.user.name && this.user.email && this.user.password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(this.auth, this.user.email, this.user.password);
        const userDocRef = doc(this.firestore, `users/${userCredential.user.uid}`);
        await setDoc(userDocRef, { name: this.user.name, email: this.user.email, createdAt: new Date() });

        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['./auth/login']);
      } catch (error) {
        console.error('Falha ao cadastrar usuario:', error);
        alert('Error: ' + error.message);
      }
    } else {
      alert('Por favor preencha todos os campos!');
    }
  }
}
