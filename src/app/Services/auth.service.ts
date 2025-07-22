import { Injectable } from '@angular/core';
import { Auth, user, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, UserCredential, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
  }

  async signup(name: string, email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          throw new Error('Ese correo ya está registrado.');
        }
        throw err;
      });
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .catch(err => {
        if (err.code === 'auth/wrong-password') {
          throw new Error('Contraseña incorrecta.');
        } else if (err.code === 'auth/user-not-found') {
          throw new Error('No existe cuenta con ese correo.');
        }
        throw err;
      });
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map(u => !!u));
  }
}
