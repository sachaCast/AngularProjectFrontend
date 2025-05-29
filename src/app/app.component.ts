import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {AssignmentsComponent} from './assignments/assignments.component';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; // Ajoute MatInputModule
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatButtonModule, FormsModule, MatDividerModule,
    MatIconModule, MatSlideToggleModule,MatFormFieldModule,MatInputModule,
    MatToolbarModule,MatSidenavModule,MatListModule,MatSelectModule,
    MatRadioModule,
    HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Application de gestion de devoirs a rendre (Assignments)';

  username = "";
  password = "";
  loggedIn: boolean;
  loginError = '';
  opened = false;

  constructor (private authService:AuthService, private router: Router){
    this.loggedIn = this.authService.loggedIn;
  }

  login() {
    this.loginError = '';
    this.authService.logIn(this.username, this.password).then(success => {
      if (!success) {
        this.loginError = 'Erreur : Identifiants incorrects.';
        this.loggedIn = false;
      } else {
        this.loggedIn = true;
      }
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/home']);
    this.loggedIn = false;
    this.loginError = '';
    this.username = '';
    this.password = '';  }

  toggleSidebar() {
    // Ici, nous n'avons pas besoin de méthode spécifique, mais on pourrait utiliser un ViewChild si nécessaire
  }
}
