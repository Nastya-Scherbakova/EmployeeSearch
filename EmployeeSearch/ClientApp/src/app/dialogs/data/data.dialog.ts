import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Person } from "../../models/person.model";

import { Company } from "../../models/company.model";
import { Vacancy } from "../../models/vacancy.model";

@Component({
  selector: 'data-dialog',
  templateUrl: 'data.dialog.html',
})
export class DataDialog {
  fields: Array<any> = new Array();

  title: string;
  constructor(
    public dialogRef: MatDialogRef<DataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    var checkField;
    Object.keys(this.data).forEach(el => {
      if (typeof this.data[el] != 'object') {
        var newField = {
        name: el,
        type: typeof this.data[el]
      };
      if(newField.type == 'string') checkField = newField;
      this.fields.push(newField);
      }
    });
    if (this.data[checkField.name].length > 1) {
      this.title= 'Edit ';
    }
    else this.title = 'Add ';
    if (this.data instanceof Person) {
      this.title += 'Person'
    } else if (this.data instanceof Company) {
      this.title += 'Company'
    } else if (this.data instanceof Vacancy) {
      this.title += 'Vacancy'
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
