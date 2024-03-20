import { Component } from '@angular/core';
import { Customer } from '../models/customer';
import { FormsModule } from '@angular/forms';
import axios, { AxiosRequestConfig } from 'axios';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  customer: Customer = new Customer(0,"","","",0,"","","");
  token: string = "";//"eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJuYmYiOjE3MTA3MTEwNTQsImV4cCI6MTcxMDc0NzA1NH0.5dWc4iTaH5UuHmyJF4a2ZiDL4MzC66_mI9wiBZXLdMw";

  submitForm() {
    console.log(this.customer);
    axios.post("https://localhost:44379/Customer", this.customer, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    })
    .then(response => {
      console.log(response)
    }).catch(err => {
      if(err.response && err.response.status === 401){
        this.getToken();
        this.submitForm();
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
