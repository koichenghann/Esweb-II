import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { MaterialsService } from '../material.service';
import { NotificationService } from '../notification.service';
import { Material } from '../material.model';
import { ThrowStmt } from '@angular/compiler';

declare var M:any;

@Component({
  selector: 'material-form',
  templateUrl: './material-form.html',
  styleUrls: ['./material-form.css'],
  providers: [MaterialsService]
})

export class MaterialFormComponent implements OnInit {




  constructor(public materialsService: MaterialsService, private notificationService: NotificationService) {}

  materialData = [];

  ngOnInit(){
    this.getAllMaterials();
    this.resetForm();
    //if(this.materialsService.selectedMaterial == undefined){
    //    this.materialsService.selectedMaterial=new Material();
    //}

  }

  //reset form
  resetForm(form?: NgForm){
    console.log('reset form tan');
    if(form){
      //form.reset();
      form.resetForm(form.value);
    }

    this.materialsService.selectedMaterial = {
      _id: "",
      materialID: "",
      materialName: "",
      description: "",
      pointsPerKg: "",
    }


    //form.getControl('description').setErrors(null);
    //form.resetForm();
    //this.getAllMaterials();
  }

  //submit form
  onSubmit(form : NgForm){
    if (form.invalid) {
      return;
    }
    if(form.value._id == "" || form.value._id == null){
      console.log("create ran")
      this.materialsService.submitMaterial(form.value).subscribe((res) => {
        this.resetForm(form);
        this.getAllMaterials();
         this.notificationService.success('New Material has created successfully!');
         //M.toast({ html: 'Saved successfully',classes: 'rounded' });
      });
    }
    else {
      console.log("update ran, id: " + form.value._id);
      this.materialsService.putMaterial(form.value).subscribe((res) => {
        this.resetForm(form);
        this.getAllMaterials();

         this.notificationService.success('Material has been updated successfully!');
         //M.toast({ html: 'Saved successfully',classes: 'rounded' });
      });
    }

  }

  //get all material data
  getAllMaterials(){
    this.materialsService.getAllMaterials().subscribe(res =>{
      this.materialData = res.materials;
    });
  }

  onEdit(material : Material){
    this.materialsService.selectedMaterial = material;
    console.log(this.materialsService.selectedMaterial);
  }

  onDelete(_id: string, form: NgForm) {
    console.log("delete clicked, id: " + _id);
     if (confirm("Are you sire to delete this material?")){
       this.materialsService.deleteMaterial(_id).subscribe((res)=>{
         this.getAllMaterials();
         this.resetForm();
         this.notificationService.success('Material has been deleted successfully!');
       });
     }
  }



  onAddMaterial(form: NgForm) {
    console.log("form is valid: " + form.invalid);
    if (form.invalid) {
      return;
    }

    const material = {
      materialID: form.value.materialID,
      materialName: form.value.materialName,
      description: form.value.description,
      pointsPerKg: form.value.pointsPerKg,
    };
    form.resetForm();
    this.getAllMaterials();
    this.materialsService.addMaterial(form.value.materialID, form.value.materialName, form.value.description, form.value.pointsPerKg);

  }

  /*refreshMaterialList() {
    this.materialsService.getMaterials().subscribe((res) => {});
  }*/


}
