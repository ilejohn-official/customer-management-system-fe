import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, FormsModule, NgbModule, NgbPaginationModule],
  providers: [DatePipe],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  private customerService = inject(CustomerService);
  private datePipe = inject(DatePipe)

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

}
