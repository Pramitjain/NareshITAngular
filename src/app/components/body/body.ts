import { Component } from '@angular/core';
import { LeftPanel } from '../left-panel/left-panel';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body',
  imports: [LeftPanel, RouterLink, RouterOutlet],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {

}
