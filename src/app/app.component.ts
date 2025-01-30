import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CustomerComponent } from './components/customer/customer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomerComponent],
  template: '<app-customer></app-customer>',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
