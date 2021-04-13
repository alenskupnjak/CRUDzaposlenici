import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { DepartmentService} from '../../shared/department.service';
import { NotificationService } from '../../shared/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})



export class EmployeeComponent implements OnInit {

  odjel = [
    { id: 1, value: 'Dep 1'},
    { id: 2, value: 'Dep 2'},
    { id: 3, value: 'Dep 3'}
  ];

  constructor(
    public service: EmployeeService,
    private departmentService: DepartmentService,
    private notification: NotificationService,
    private dialogRef: MatDialogRef<EmployeeComponent>) { }

  ngOnInit() {
    this.service.getEmployees();
  }



  obrisiPodatke() { // briše podatke iz forme
    this.service.form.reset();
    this.service.inicijalizirajFormu();
    this.notification.uspjesno('Uspješno obrisani podaci');
  }


  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value) {
      this.service.insertEmploye(this.service.form.value);
      } else {
      this.service.updateEmploye(this.service.form.value);
      this.service.form.reset();
      this.service.inicijalizirajFormu();
      this.notification.uspjesno('Uspješno prijavlje podaci');
      this.onClose();
      }
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.inicijalizirajFormu();
    this.dialogRef.close();
  }

}


      // console.log(this.service.form.value.hiredate);
      // const dan = this.service.form.value.hiredate.getDate();
      // const mjesec = this.service.form.value.hiredate.getMonth();
      // const godina = this.service.form.value.hiredate.getFullYear();
      // const datum = dan + '-' + mjesec + '-' + godina;
      // console.log('dan=' + dan);
      // console.log('mjesec=' + mjesec);
      // console.log('godina=' + godina);
      // console.log('datum=' + datum);
      // this.service.form.value.hiredate = datum;
