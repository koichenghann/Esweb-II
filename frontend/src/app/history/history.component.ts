import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SubmissionService } from '../submission/submission.service';
import { MaterialsService } from '../admin-manage-material/material.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  userType;

  histories:any = null;
  hide=false;
  firstRow = true;
  resultt;
  result
  mobile = false;

  materials;
  material;

  sortedByActualDate = false;
  sortedByStatus = false;
  sortedBySubmissionID = false;

  viewHistory = false;

  constructor(
    public authService: AuthService,
    public subService: SubmissionService,
    public matService: MaterialsService
  ) { }

  ngOnInit(): void {
    this.authService.setCurrentUrl(window.location.pathname);

    this.userType = this.authService.getUserType();
    this.subscribeToMaterialsUpdate();
    this.getMaterials();

    this.subscribeToHistory();
    //this.getHistory();

    this.onResize(null);

  }

  selectMaterial(i) {
    this.material = this.materials[i];
    //console.log('material ID: ' + this.material._id);
    this.histories = [];
    this.getHistory();
    this.viewHistory = true;
  }

  subscribeToMaterialsUpdate() {
    this.matService.getMaterialsUpdatedListener().subscribe( result => {
      this.getMaterials();
    });
  }

  getMaterials() {
    this.matService.getAllMaterials().subscribe( result => {
      this.materials = [];
      for ( let mat of result.materials ) {
        mat = Object.assign({}, mat);
        mat.selected = false;
        this.materials.push(mat);
      }
      //console.log(this.materials);
    });
  }


  onResize(event) {

    if (window.screen.width < 850) { // 768px portrait
      this.mobile=true;
    } else {
      this.mobile=false;
    }
    //console.log('size: ' + window.screen.width + " mobile: " + this.mobile);
  }

  subscribeToHistory(){
    this.subService.getSubRetrievedListerner().subscribe( result => {
      this.histories = [];

      this.result = result;
      this.sortedBySubmissionID = false;
      this.sortHistoryByID();
      //this.histories = result;
    });
  }


  convertTableData( dataSource: any ) {
    this.histories = [];
    for ( let history of dataSource ) {
      if(!history.actualDate) { history.actualDate = 0;}
      history.expanded = false;
      this.histories.push(history);
      let detailsForExpandedCell = Object.assign({}, history);
      detailsForExpandedCell.hide = true;
      this.histories.push(detailsForExpandedCell);
    }
    //console.log(this.histories);
  }


  sortHistoryByID() {
    this.convertTableData(this.result.sort((a,b)=>(a.submissionID>b.submissionID)?(this.sortedBySubmissionID?-1:1):(this.sortedBySubmissionID?1:-1)));
    this.sortedBySubmissionID = !this.sortedBySubmissionID;
  }
  sortHistoryByActualDate() {
    this.convertTableData(this.result.sort((a,b)=>(a.actualDate.toString()>b.actualDate.toString())?(this.sortedByActualDate?1:-1):(this.sortedByActualDate?-1:1)));
    this.sortedByActualDate = !this.sortedByActualDate;
  }
  sortHistoryByStatus() {
    this.convertTableData(this.result.sort((a,b)=>(a.status>b.status)?(this.sortedByStatus?1:-1):(this.sortedByStatus?-1:1)));
    this.sortedByStatus = !this.sortedByStatus;
  }


  generate() {
    this.subService.genDummySub();
  }

  getHistory() {
    this.subService.getSubmissions(this.material._id);
  }//5e6717329d4a704b408a51e9 //5e671b519d4a704b408a51eb

  expand(i:any){
    //console.log('at: ' + i);
    for ( let y = 0; y < this.histories.length; y++) {
      if ( y != i ) {
        this.histories[y].expanded = false;
        if( this.histories[y].hide != undefined && y != i+1) {
          this.histories[y].hide = true;
        }
      }
    }
    this.histories[i].expanded = !this.histories[i].expanded;
    this.histories[i+1].hide = !this.histories[i+1].hide;
  }
}
