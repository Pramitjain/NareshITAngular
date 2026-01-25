import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-panel',
  imports: [],
  templateUrl: './left-panel.html',
  styleUrl: './left-panel.css',
})
export class LeftPanel {

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
