import { Injectable } from '@angular/core';

// za feaktivnu fromu moramo uvesti ova dav modula
import { FormGroup, FormControl} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  constructor() { }

  form: FormGroup = new FormGroup ({
    $key: new FormControl(null),
    fullName: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    city: new FormControl(''),
    gender: new FormControl(''),
    department: new FormControl(0),
    hiredate: new FormControl(''),
    isPermanent: new FormControl('')
  });
}
