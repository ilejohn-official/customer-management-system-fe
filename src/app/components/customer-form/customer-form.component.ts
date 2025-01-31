import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { ReplaceUnderscorePipe } from '../../pipes/replace-underscore.pipe';

@Component({
  selector: 'app-customer-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ReplaceUnderscorePipe],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent {
  private customerService = inject(CustomerService);
  private fb = inject(FormBuilder);
  customerForm: FormGroup;
  private activeModal = inject(NgbActiveModal);

  constructor() {
    this.customerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      telephone: ['', Validators.required],
      bvn: ['', Validators.required],
      dob: ['', Validators.required],
      residential_address: ['', Validators.required],
      state: ['', Validators.required],
      bankcode: ['', Validators.required],
      accountnumber: ['', Validators.required],
      company_id: [1, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      country: ['', Validators.required],
      id_card: [null],
      voters_card: [null],
      drivers_licence: [null],
    });
  }

  saveCustomer() {
    if (!this.customerForm.valid) {
      alert('Invalid input');

      return;
    }

    this.customerService.createCustomer(this.customerForm.value).subscribe((response) => {
      console.log('Customer created:', response);
      this.activeModal.close();
    });
  }

  close() {
    this.activeModal.dismiss();
  }
}
