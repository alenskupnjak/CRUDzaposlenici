import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DepartmentService } from 'src/app/shared/department.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EmployeeComponent } from '../employee/employee.component';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(
    private service: EmployeeService,
    private departmentService: DepartmentService,
    private dialog: MatDialog) { }


  listData: MatTableDataSource<any>;
  kolone: string [] = ['fullName', 'email', 'mobile' , 'city', 'departmentName', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
   this.service.getEmployees().subscribe(
     data => {
    let polje = data.map(podatak => {
      let departmentName = this.departmentService.getDepartmentname(podatak.payload.val()['department']);
      return {
           $key: podatak.key,
           departmentName : departmentName,
            ...podatak.payload.val()
       };
     });
    this.listData = new MatTableDataSource(polje);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    console.log(this.listData.data);
  });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
   this.listData.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  onCreate() {
    this.service.inicijalizirajFormu();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

}
