import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = `${environment.apiUrl}/customers`;
  private http = inject(HttpClient);

  /**
   * Get customers with pagination and search
   */
  getCustomers(page: number, pageSize: number, searchText: string = ''): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString())
      .set('search_text', searchText);

    return this.http.get<any>(this.apiUrl, { params });
  }

  /**
   * Create a new customer
   */
  createCustomer(customer: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, customer);
  }

  /**
   * Update an existing customer
   */
  updateCustomer(id: number, customer: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}`, customer);
  }
}
