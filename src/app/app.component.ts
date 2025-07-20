// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthTestService } from './Services/auth-test.service';
import { TaskTestService, Task } from './Services/TaskService.service';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<ion-app><ion-router-outlet></ion-router-outlet></ion-app>`,
  imports: [IonApp, IonRouterOutlet]
})
export class AppComponent implements OnInit { constructor(
    private authTest: AuthTestService,
    private taskTest: TaskTestService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      // 1) Registro de usuario de prueba
      const signupRes = await this.authTest.testSignup('test@correo.com', '123456');
      const uid = signupRes.user.uid;
      console.log('Usuario creado, UID=', uid);

      // 2) Crear tarea de prueba
      const taskData: Task = {
        ownerId: uid,
        title: '¡Hola Firestore!',
        completed: false
      };
      const addRes = await this.taskTest.testAddTask(uid, taskData);
      console.log('Tarea creada, ID=', addRes.id);

      // 3) Leer la tarea
      const getRes = await this.taskTest.testGetTask(uid, addRes.id);
      console.log('Tarea leída:', { id: getRes.id, ...getRes.data() });

      // 4) Actualizar la tarea
      await this.taskTest.testUpdateTask(uid, addRes.id, { completed: true });
      console.log('Tarea marcada como completada');

      // 5) Eliminar la tarea
      await this.taskTest.testDeleteTask(uid, addRes.id);
      console.log('Tarea eliminada');

      // 6) Logout
      await this.authTest.testLogout();
      console.log('Logout exitoso');

      console.log('✅ Prueba de Firebase completada');
    } catch (err) {
      console.error('❌ Error durante la prueba de Firebase:', err);
    }
  }
}
