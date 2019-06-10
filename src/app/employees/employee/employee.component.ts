// import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { DepartmentService} from '../../shared/department.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})



// @NgModule({
//   schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
// })


export class EmployeeComponent implements OnInit {

  odjel = [
    { id: 1, value: 'Dep 1'},
    { id: 2, value: 'Dep 2'},
    { id: 3, value: 'Dep 3'}
  ];

  constructor(
    private service: EmployeeService,
    private departmentService: DepartmentService) { }

  ngOnInit() {
    this.service.getEmployees();
  }



  obrisiPodatke() { // briše podatke iz forme
    this.service.form.reset();
    this.service.inicijalizirajFormu();
  }


  onSubmit() {
    if (this.service.form.valid) {
      this.service.insertEmploye(this.service.form.value);
      this.service.form.reset();
      this.service.inicijalizirajFormu();
    }

  }

}
