import { Injectable } from "@angular/core";

// za feaktivnu fromu moramo uvesti ova dav modula
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import * as _ from "lodash";
import { DatePipe } from "@angular/common";

@Injectable({ providedIn: "root" })
export class EmployeeService {
  constructor(
    private firebase: AngularFireDatabase,
    private datePipe: DatePipe
  ) {}

  employeeList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl("", Validators.required),
    email: new FormControl("", Validators.email),
    mobile: new FormControl("", [Validators.required, Validators.minLength(8)]),
    city: new FormControl(""),
    gender: new FormControl(""),
    department: new FormControl(0),
    hiredate: new FormControl(""),
    isPermanent: new FormControl(""),
  });

  inicijalizirajFormu() {
    this.form.setValue({
      $key: null,
      fullName: "",
      email: "",
      mobile: "",
      city: "",
      gender: "",
      department: 0,
      hiredate: "",
      isPermanent: false,
    });
  }

  getEmployees() {
    this.employeeList = this.firebase.list("employees");
    return this.employeeList.snapshotChanges();
  }

  insertEmploye(employee) {
    this.employeeList.push({
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hiredate:
        employee.hiredate == ""
          ? ""
          : this.datePipe.transform(employee.hiredate, "yyyy-MM-dd"),
      isPermanent: employee.isPermanent,
    });
  }

  updateEmploye(employee) {
    this.employeeList.update(employee.$key, {
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hiredate: employee.hiredate,
      isPermanent: employee.isPermanent,
    });
  }

  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }

  populateForm(row) {
    this.form.setValue(_.omit(row, "departmentName"));
  }
}
