import { Component, inject, Input, OnInit } from '@angular/core';
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
export class CustomerFormComponent implements OnInit {
  private customerService = inject(CustomerService);
  private fb = inject(FormBuilder);
  private activeModal = inject(NgbActiveModal);

  customerForm: FormGroup;
  controlNames: string[] = [];
  @Input() selectedCustomer: any = null;
  isEditing: boolean = false;
  formErrors: string[] = [];

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

    this.controlNames = Object.keys(this.customerForm.controls).filter(controlName => controlName !== 'company_id');
  }

  ngOnInit() {
    if (this.selectedCustomer) {
      this.isEditing = true;
      this.customerForm.patchValue(this.selectedCustomer);
    }
  }

  saveCustomer() {
    if (!this.customerForm.valid) {
      alert('Invalid input');

      return;
    }

    if (this.isEditing) {
      // Update existing customer
      this.customerService.updateCustomer(this.selectedCustomer.id, this.customerForm.value).subscribe(
      {
        next: (response) => {
            console.log('Customer updated:', response);
            this.activeModal.close(response);
        },
       error: (err) => {
          this.handleErrors(err)
       }
      });
    } else {
      // Create new customer
      this.customerService.createCustomer(this.customerForm.value).subscribe({
        next: (response) => {
          console.log('Customer created:', response);
          this.activeModal.close(response);
        },
        error: (err) => {
          this.handleErrors(err)
        }
      })
    }

  }

  handleErrors(response: any) {
    this.formErrors = [];
    console.log(response.error.errors);

    let errors = response?.error?.errors;
    if(errors instanceof Object && Object.keys(errors).length > 0){
      Object.keys(errors).forEach((controlName) => {
        const control = this.customerForm.get(controlName);
        if (control) {
          this.formErrors.push(`${controlName} : ${errors[controlName].join(', ')}`)
        }
      })
    } else {
      this.formErrors.push(response?.error?.message)
    }
  }

  close() {
    this.activeModal.dismiss();
  }
}
