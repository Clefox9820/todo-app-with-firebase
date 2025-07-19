import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthTestService {
  constructor(private auth: Auth) {}

  // Inicia sesión y muestra el usuario en consola
  async testLogin(email: string, password: string) {
    try {
      const userCred = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('✔️ Login exitoso:', userCred.user);
    } catch (err) {
      console.error('❌ Error en login:', err);
    }
  }

  // Crea usuario y muestra el resultado en consola
  async testSignup(email: string, password: string) {
    try {
      const userCred = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('✔️ Registro exitoso:', userCred.user);
    } catch (err) {
      console.error('❌ Error en registro:', err);
    }
  }

  // Cierra sesión y confirma en consola
  async testLogout() {
    try {
      await signOut(this.auth);
      console.log('✔️ Logout exitoso');
    } catch (err) {
      console.error('❌ Error en logout:', err);
    }
  }
}
