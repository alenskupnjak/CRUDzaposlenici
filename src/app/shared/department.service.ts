import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

import * as _ from "lodash";

@Injectable({ providedIn: "root" })
export class DepartmentService {
  departmentList: AngularFireList<any>;
  zanimanje = [];

  constructor(private firebase: AngularFireDatabase) {
    this.departmentList = this.firebase.list("departments");
    this.departmentList.snapshotChanges().subscribe((data) => {
      this.zanimanje = data.map((podatak) => {
        return {
          $key: podatak.key,
          ...podatak.payload.val(),
        };
      });
    });
  }

  getDepartmentname($key) {
    if ($key == "0") {
      return "";
    } else {
      return _.find(this.zanimanje, (obj) => {
        return obj.$key == $key;
      })["name"];
    }
  }
}
