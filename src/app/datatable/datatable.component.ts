import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CreateMaterialFormComponent } from './create-material-form/create-material-form.component';
import { CreateMaterialService } from './shared/create-material.service';
import { NotificationService } from './shared/notification.service';

export interface Material {
  position: number;
  materialID: string;
  materialName: string;
  description: string;
  pointsPerKg: string;
}

const getMaterial: Material[] = [
  {position:1, materialID:'1', materialName:'Paper',description:'Paper is valuable and accepted for recycling',pointsPerKg:'0.5'},
  {position:2, materialID:'2', materialName:'Paper',description:'Paper is valuable and accepted for recycling',pointsPerKg:'0.5'},
  {position:3, materialID:'3', materialName:'Paper',description:'Paper is valuable and accepted for recycling',pointsPerKg:'0.5'}

];

/**
 * @title Basic use of `<mat-table>` (uses display flex)
 */
@Component({
  selector: 'material-table',
  styleUrls: ['datatable.component.css'],
  templateUrl: 'datatable.component.html',
})
export class DatatableComponent {

  constructor(private dialog: MatDialog,
    private service: CreateMaterialService,
    private notificationService: NotificationService,) { }
  displayedColumns: string[] = ['materialID', 'materialName', 'description', 'pointsPerKg', 'actions'];
  dataSource = getMaterial;


  onCreate(){
    this.service.intializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CreateMaterialFormComponent,dialogConfig);
    //this.notificationService.success('New Material has created successfully!');
  }

  onSubmit(){
    this.notificationService.success('New Material has created successfully!');
    this.onClose();
  }

  onClose(){
     this.service.form.reset();
     this.service.intializeFormGroup();
     //this.dialogRef.close();
  }

  //update
  onEdit(row: any){
   // alert(row.parentElemet);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CreateMaterialFormComponent,dialogConfig);
  }
}
