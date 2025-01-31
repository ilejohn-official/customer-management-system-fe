import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbModule, NgbModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, FormsModule, NgbModule, NgbPaginationModule, NgbDropdownModule],
  providers: [DatePipe],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  private customerService = inject(CustomerService);
  private datePipe = inject(DatePipe);
  private modalService = inject(NgbModal);

  currentPage = 1;
  itemsPerPage = 5;
  itemsPerPageOptions = [5, 10, 15, 20];
  searchText = '';

  customers = <any[]>[];
  totalPages = 1;
  totalCustomers = 0;

  ngOnInit() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.customerService
      .getCustomers(this.currentPage, this.itemsPerPage, this.searchText)
      .subscribe(response => {
        const data = response.data;

        this.customers = data.data;
        this.totalPages = data.last_page;
        this.totalCustomers = data.total;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchCustomers();
  }

  onItemsPerPageChange(event: any) {
    this.itemsPerPage = event.target.value;
    this.fetchCustomers();
  }

  formatDate(date: string) {
    return this.datePipe.transform(date, 'MMM dd, yyyy, h:mm:ss a') + ' GMT';
  }

  openCustomerForm(customer: any = null) {
    const modalRef = this.modalService.open(CustomerFormComponent);
    modalRef.componentInstance.selectedCustomer = customer;
    
    modalRef.result.then(() => this.fetchCustomers(), () => {});
  }


}
