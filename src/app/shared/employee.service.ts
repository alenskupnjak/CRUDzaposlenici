import { Injectable } from '@angular/core';

// za feaktivnu fromu moramo uvesti ova dav modula
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  constructor() { }

  form: FormGroup = new FormGroup ({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl(''),
    department: new FormControl(0),
    hiredate: new FormControl(''),
    isPermanent: new FormControl('')
  });



  inicijalizirajFormu() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '',
      department: 0,
      hiredate: '',
      isPermanent: false
    });

  }
}
