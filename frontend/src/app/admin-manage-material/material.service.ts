import { Material } from './material.model';
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs';
import { HttpClient } from  "@angular/common/http";

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/material';

@Injectable({providedIn: 'root'})
export class MaterialsService {

  selectedMaterial: Material;

  private materials: Material[] = [];
  private materialsUpdated = new Subject<Material[]>();

  readonly baseURL = 'http://localhost:3000/material'

  materialExistListener = new Subject<any>();

  //inject http into postservice
  constructor(private http: HttpClient){}



  //get post from server
  /*getMaterials(){
    //http get method expect path to server
    //to listen to the request need to put subscride
    //subscride method: first one for new data, second for errors ,third one when it completes
    this.http.get<{message: string, materials: Material[]}>('http://localhost:3000/api/material').subscribe((materialData) => {

      //data from server
      this.materials = materialData.materials;

      //notify angular app
      this.materialsUpdated.next([...this.materials]);
    });

    return this.materials;
  }*/

  //angular http client use an observable

  //customer made by koi

  getMaterialExistListener() {
    return this.materialExistListener.asObservable();
  }
  checkMaterialExist(materialName) {
    this.http.post<any>(BACKEND_URL + '/findMaterial', {materialName:materialName}).subscribe( result => {
      if ( result.length > 0 ) {
        this.materialExistListener.next(result[0]);
      }
    });
  }


  getMaterialsUpdatedListener(){
    return this.materialsUpdated.asObservable();
  }

  addMaterial( materialID: string, materialName: string ,description: string ,pointsPerKg: string){
    const materials: Material = { _id: null, materialID: materialID, materialName: materialName, description:description, pointsPerKg: pointsPerKg};
    this.materials.push(materials);
    this.materialsUpdated.next([...this.materials]);
  }


  //submit new material
  submitMaterial(material: Material){
    return this.http.post(BACKEND_URL + '/createMaterial', material);
  }

  //get materials
  getAllMaterials(){
    return this.http.get<{materials: any}>(BACKEND_URL + '/getMaterials');
  }

 putMaterial(material: Material){
   return this.http.put(BACKEND_URL + "/updateMaterial",
    {
      _id: material._id,
      materialID: material.materialID,
      materialName: material.materialName,
      description: material.description,
      pointsPerKg: material.pointsPerKg
    }
  );
 }

 deleteMaterial(_id: String) {
   return this.http.delete(BACKEND_URL +_id)
 }


 getCollectors(materialId) {
   return this.http.post(BACKEND_URL + "/getCollectors", {materialId: materialId});
 }


}
