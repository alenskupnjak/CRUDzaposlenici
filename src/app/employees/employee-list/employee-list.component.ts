import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DepartmentService } from 'src/app/shared/department.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EmployeeComponent } from '../employee/employee.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(
    private service: EmployeeService,
    private departmentService: DepartmentService,
    private dialog: MatDialog,
    private notoficationService: NotificationService,
    private dialogService: DialogService) { }


  listData: MatTableDataSource<any>;
  kolone: string [] = ['fullName', 'email', 'mobile' , 'city', 'departmentName', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  listaZaBrisanje: any [] = [];

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

  onDelete($key) {
    this.dialogService.openConfirmDialog('Dali želi obrisati zapis?')
    .afterClosed().subscribe(res => {
     if (res) {
      this.service.deleteEmployee($key);
      this.notoficationService.upozorenje('! Obrisano uspješno');
     }
    });
  }

  obrisiVise() {
    if(this.listaZaBrisanje.length === 0) return;
    this.dialogService.openConfirmDialog('Želis li obristi više zapisa ?').afterClosed()
    .subscribe(res => {
      console.log(res);
      if (res) {
       this.listaZaBrisanje.forEach( data => {
         this.service.deleteEmployee(data);
        });
     this.listaZaBrisanje = [];
   }
   });
  }


  pripremiZaBrisanje($key) {

    let duljinaZapisa = this.listaZaBrisanje.length;
      let trazim = -1;
      this.listaZaBrisanje.forEach((data, index) => {
        console.log ( `index=${index}` );
        if (data === $key) {
          trazim = index ;
          console.log(data, $key);
          console.log(`Naso ga`);
        }
      });
      if (trazim === -1) this.listaZaBrisanje.push($key)
      if (trazim !== -1 ) this.listaZaBrisanje.splice(trazim, 1);
      console.log(`Kraj`);
      console.log(this.listaZaBrisanje);
      return this.listaZaBrisanje;
  }

}
