import { Component, OnInit, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';
//import { MAT_DIALOG_DATA } from '@angular/material/MatDialog/MAT_DIALOG_DATA';
import { MaterialsService } from '../admin-manage-material/material.service';
import { Material } from '../admin-manage-material/material.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-add-collector-material-dialog',
  templateUrl: './add-collector-material-dialog.component.html',
  styleUrls: ['./add-collector-material-dialog.component.css']
})

export class AddCollectorMaterialDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public materialsService: MaterialsService) {
    console.log('constructor hellow')
  }

  ngOnInit(): void {
  }
}
