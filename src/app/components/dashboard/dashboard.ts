import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LeftPanel } from '../left-panel/left-panel';

@Component({
  selector: 'app-dashboard',
  imports: [LeftPanel],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  /**
   *
   */
  constructor(private router: Router) {
    
  }

  onLogout() {
    localStorage.removeItem('bearerToken');
    this.router.navigate(['/login']);
  }

}
