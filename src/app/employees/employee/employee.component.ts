// import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})



// @NgModule({
//   schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
// })


export class EmployeeComponent implements OnInit {

  depart = [
    { id: 1, value: 'Dep 1'},
    { id: 2, value: 'Dep 2'},
    { id: 3, value: 'Dep 3'}
  ];

  constructor(private service: EmployeeService) { }

  ngOnInit() {
  }

  obrisiPodatke() {
    this.service.form.reset();
    this.service.inicijalizirajFormu();
  }

}
