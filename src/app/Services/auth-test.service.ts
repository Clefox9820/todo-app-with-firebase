import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthTestService {
  constructor(private auth: Auth) {}

  async testSignup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async testLogin(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async testLogout() {
    return signOut(this.auth);
  }
}
