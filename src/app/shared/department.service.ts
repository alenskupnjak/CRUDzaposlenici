import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

import * as _ from 'lodash';

@Injectable({ providedIn: 'root'})



export class DepartmentService {
  departmentList: AngularFireList<any>;
  polje = [];

  constructor(private firebase: AngularFireDatabase) {
    this.departmentList = this.firebase.list('departments');
    this.departmentList.snapshotChanges().subscribe(
      data => {
      this.polje = data.map(podatak => {
        return {
          $key: podatak.key,
           ...podatak.payload.val()
        };
      });
    });
  }


    getDepartmentname($key) {
      if ($key == '0') {
        return '';
      } else {
        return _.find(this.polje, (obj) => { return obj.$key == $key; })['name'];
      }
    }

}
