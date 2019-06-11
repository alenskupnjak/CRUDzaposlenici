import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource } from '@angular/material';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor( private service: EmployeeService) { }

  listData: MatTableDataSource<any>;
  kolone: string [] = ['fullName', 'email', 'mobile' , 'city', 'actions'];

  ngOnInit() {
   this.service.getEmployees().subscribe(
     data => {
    let polje = data.map(podatak => {
      return {
           $key: podatak.key,
            ...podatak.payload.val()
       };
     });
    this.listData = new MatTableDataSource(polje);
    console.log(this.listData.data);
  });
  }

}
