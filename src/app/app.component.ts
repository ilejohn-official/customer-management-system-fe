import { Component } from '@angular/core';

import { CustomerComponent } from './components/customer/customer.component';

@Component({
  selector: 'app-root',
  imports: [CustomerComponent],
  template: '<app-customer></app-customer>',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
