import { Injectable } from '@angular/core';
import { Auth,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, authState } from '@angular/fire/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { UserI } from './UserInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth:Auth) { }
  recover({email}:any){
    return sendPasswordResetEmail(this.auth, email);
  }
  // register({email, password}:any){
  //   return createUserWithEmailAndPassword(this.auth, email, password);
  // }
  register(datos: UserI){
    return createUserWithEmailAndPassword(this.auth, datos.email, datos.password);
  }

  login({email,password}:any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  logout(){
    return signOut(this.auth);
  }
  stateUser() {
    return authState(this.auth);
  }
}
