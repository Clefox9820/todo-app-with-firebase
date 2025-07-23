import { inject, Injectable } from '@angular/core';
import { Auth, user, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, UserCredential, User, authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  user$: Observable<User | null> = authState(this.auth);
   private router = inject(Router);


  constructor() {
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

  /**
   * Cierra la sesión del usuario actual.
   *
   * @returns Una promesa que se resuelve cuando el usuario ha cerrado sesión.
   */

async logout(): Promise<void> {
  try {
    await signOut(this.auth);
    localStorage.removeItem('redirectUrl');
    this.router.navigateByUrl('/login');
  } catch (err: any) {
    console.error('Error en logout:', err);
    throw new Error('No se pudo cerrar sesión. Intenta de nuevo.');
  }
}
  /**
   * Obtiene un Observable que emite true si el usuario está autenticado
   * y false si no lo está.
   */
  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map(u => !!u));
  }
}
