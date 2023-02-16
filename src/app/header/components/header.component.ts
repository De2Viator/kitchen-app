import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: '../templates/header.component.html',
  styleUrls: ['../styles/header.component.scss']
})
export class HeaderComponent {
  items:string[] = ['Recipes','Shopping Cart','Profile']
}
