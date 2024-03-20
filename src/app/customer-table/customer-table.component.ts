import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.css'
})
export class CustomerTableComponent {
  customers: Customer[] = [];
  token: string = "";

  refresh() {
    this.customers = [];
    this.fetchCustomers();
  }

  fetchCustomers() {
    axios.get<Customer[]>("https://localhost:44379/Customer",{
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    })
    .then(response => {
      console.log(response);
      response.data.forEach(customer=> {
        let cus = new Customer(customer.id, customer.name, customer.lastName, customer.governmentId, customer.age, customer.sex, customer.tel, customer.email);
        this.customers.push(cus);
      });
      console.log(this.customers);
    }).catch(err => {
      if(err.response && err.response.status === 401){
        this.getToken();
        this.fetchCustomers();
      }
      console.log(err);
    })
  }

  getToken(){
    axios.post("https://localhost:44379/api/Authentication")
    .then(response => {
      this.token = response.data.accessToken
    }).catch(err => console.log(err))
  }
}
