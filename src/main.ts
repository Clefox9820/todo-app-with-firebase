// src/main.ts
import { bootstrapApplication }   from '@angular/platform-browser';
import { provideRouter }          from '@angular/router';
import { initializeApp }          from 'firebase/app';
import { provideFirebaseApp }     from '@angular/fire/app';
import { getAuth, provideAuth }   from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AppComponent }           from './app/app.component';
import { routes }                 from './app/app.routes';
import { environment }            from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    // 1) Inicializa la instancia de FirebaseApp
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    // 2) Provee el servicio de Auth
    provideAuth(() => getAuth()),

    // 3) Provee el servicio de Firestore
    provideFirestore(() => getFirestore())
  ]
})
.catch(err => console.error('Error bootstrapping application:', err));
