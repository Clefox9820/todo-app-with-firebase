// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './Services/auth.service';
import { TaskService } from './Services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private task: TaskService
  ) {}

  async ngOnInit(): Promise<void> {
    const email = 'test@correo.com';
    const password = '123456';
    let userCred;

    try {
      // Intentamos login primero
      userCred = await this.auth.login(email, password);
      console.log('✔️ Login exitoso, UID =', userCred.user.uid);
    } catch (err: any) {
      if (err.message.includes('No existe cuenta')) {
        // Si no existe, creamos
        console.log('⚠️ Usuario no existe, registrando...');
        userCred = await this.auth.signup(email, password);
        console.log('✔️ Usuario creado, UID =', userCred.user.uid);
      } else {
        console.error('❌ Error en AuthService:', err.message);
        return;
      }
    }

    const uid = userCred.user.uid;

    try {
      // 2) Crear una tarea de prueba
      const taskId = await this.task.addTask({
        ownerId: uid,
        title: '¡Hola Firestorepepe!',
        completed: false
      });
      console.log('✔️ Tarea creada, ID =', taskId);

      // 3) Obtener lista de tareas
      const tasks = await this.task.getTasks().pipe().toPromise();
      console.log('📋 Tareas actuales:', tasks);

      // 4) Actualizar esa tarea
      await this.task.updateTask(taskId, { completed: true });
      console.log('✔️ Tarea marcada como completada');

      // 5) Opcional: borrar la tarea
      // await this.task.deleteTask(taskId);
      // console.log('✔️ Tarea eliminada');

    } catch (err) {
      console.error('❌ Error en TaskService:', err);
    } finally {
      await this.auth.logout();
      console.log('✔️ Logout exitoso');
      console.log('✅ Prueba de Firebase completada');
    }
  }
}
