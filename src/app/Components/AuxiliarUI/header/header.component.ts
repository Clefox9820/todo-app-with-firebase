import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButton, IonIcon, IonButtons, IonNav } from "@ionic/angular/standalone";
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonButtons, IonIcon, IonTitle, IonToolbar, IonHeader, IonButton, FormsModule],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  // isAuthenticated$: Observable<boolean>;
  authService = inject(AuthService);

  error: string | null = null;


  constructor() {
    // this.isAuthenticated$ = this.authService.isAuthenticated();
  }


  ngOnInit() { }

  async onLogout() {
    this.error = null;
    try {
      await this.authService.logout();
    } catch (err: any) {
      this.error = err.message;
    }
  }

}
