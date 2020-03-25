import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ScheduleData } from '../schedule-data.model';
import { UserData } from '../user-data.model';

@Component({
  selector: 'app-auth-schedule',
  templateUrl: './auth-schedule.component.html',
  styleUrls: ['./auth-schedule.component.css']
})
export class AuthScheduleComponent implements OnInit {
  week:ScheduleData[]=[];

  //editable = false;
  tableLoadLiao = false;
  timePicker;
  timeTable;
  timeIsValid = true;
  result:ScheduleData[]=[];
  table;
  tempCollector: UserData;
  errorMessage = "";
  timeError = "[invalid time]: time end must be after time start";
  validationList : boolean[];
  errorList : string[];
  //techno;
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
      this.authService.setCurrentUrl(window.location.pathname);
    //this.editable = false;
    this.timePicker = `<form><input matInput class="timePicker" type="time" name="" value=""></form>`;
    this.timeTable = document.getElementById('timeTable');

    let weekDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    for(var i=0;i<7;i++){
        this.week.push({day:weekDay[i],startTime: 'edit', endTime:"edit"});
    }
    console.log('this also ran');

    this.tempCollector = this.authService.getTempCol();
  }


  tableLoaded (table: any) {
    if (!this.tableLoadLiao) {
      let table1 = table;
      let week1 = [];
      let weekDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      for(var i=0;i<7;i++){
          week1.push({day:weekDay[i],startTime: 'edit', endTime:"edit"});
      }
      this.result =[];
      for ( let row of table1.getElementsByTagName("tbody")[0].getElementsByTagName('tr')){
        let day = row.getElementsByTagName("td")[0].innerHTML;
        let startTime = row.getElementsByTagName("td")[1].innerHTML;
        let endTime = row.getElementsByTagName("td")[2].innerHTML;

        this.result.push({
          day:row.getElementsByTagName("td")[0].innerHTML,
          startTime:row.getElementsByTagName("td")[1].innerHTML,
          endTime:row.getElementsByTagName("td")[2].innerHTML
        });
      }
    }
    this.tableLoadLiao = true;

      return null;
  }


  onClick(selectedCell: any){
    let table     = selectedCell.parentElement;
    let col2      = table.getElementsByTagName("td")[1];
    let col3      = table.getElementsByTagName("td")[2];

    let startTime = col2.innerHTML;
    let endTime   = col3.innerHTML;

    if (selectedCell.getAttribute('editing') == "false") {
      let cellValue = selectedCell.innerHTML;
      selectedCell.innerHTML = this.timePicker;
      selectedCell.getElementsByClassName("timePicker")[0].value = cellValue;

      selectedCell.getElementsByClassName("timePicker")[0].focus();
      selectedCell.setAttribute('editing', "true");
      //console.log('after editing' + selectedCell.getAttribute('editing'));

      let data;
      selectedCell.getElementsByClassName("timePicker")[0].addEventListener("blur", ()=>{
        data = selectedCell.getElementsByClassName("timePicker")[0].value;
        if(data){
          selectedCell.innerHTML = data;
        } else {
          selectedCell.innerHTML = 'edit';
        }
        selectedCell.setAttribute('editing', "false");



        //add cell validation here
        this.validationList = [];
        this.errorList = [];
        let validationTable = table.parentElement.parentElement.getElementsByTagName('tr');
        for( var i=1; i<=7; i++){
          let col1      = validationTable[i].getElementsByTagName("td")[0];
          let col2      = validationTable[i].getElementsByTagName("td")[1];
          let col3      = validationTable[i].getElementsByTagName("td")[2];
          let isValid;
          let error;
          startTime = col2.innerHTML;
          endTime   = col3.innerHTML;
          if (startTime=='edit'&&endTime!='edit') {
            col2.setAttribute('class', 'haveError');
            isValid = false;
            error = "start time undefined for " + col1.innerHTML;
          }
          if (startTime!='edit'&&endTime=='edit') {
            col3.setAttribute('class', 'haveError');
            isValid = false;
            error = "end time undefined for " + col1.innerHTML;
          }
          if ((startTime=='edit'&&endTime=='edit') || (startTime!='edit'&&endTime!='edit')) {
            col2.setAttribute('class', ' ');
            col3.setAttribute('class', ' ');
            isValid = true;
            error = "";

            if(startTime > endTime) {
              console.log('time range false | startTime:' + startTime + ' endTime:' + endTime);
              col2.setAttribute('class', 'haveError');
              col3.setAttribute('class', 'haveError');
              isValid = false;
              error = this.timeError;
            }
            if(startTime < endTime) {
              console.log('time range true  | startTime:' + startTime + ' endTime:' + endTime);
              col2.setAttribute('class', ' ');
              col3.setAttribute('class', ' ');
              isValid = true;
              error = "";
            }
          }
          this.errorList.push(error);
          this.validationList.push(isValid);
        }


        this.errorMessage = "";
        for(var error of this.errorList){
          if(error != "" && error != null){
            this.errorMessage = error;
          }
        }
        this.timeIsValid = true;
        for(var valid of this.validationList) {
          if(!valid){
            this.timeIsValid = false;
          }
        }

        if(selectedCell.innerHTML == 'edit'){
          selectedCell.setAttribute('edited', 'false');
        } else {
          selectedCell.setAttribute('edited', 'true');
        }



        //update table array
        this.result =[];
        for ( let row of table.parentElement.getElementsByTagName("tr")){
          let day = row.getElementsByTagName("td")[0].innerHTML;
          let startTime = row.getElementsByTagName("td")[1].innerHTML;
          let endTime = row.getElementsByTagName("td")[2].innerHTML;

          this.result.push({
            day:row.getElementsByTagName("td")[0].innerHTML,
            startTime:row.getElementsByTagName("td")[1].innerHTML,
            endTime:row.getElementsByTagName("td")[2].innerHTML
          });
        }


      });
    }
  }

  confirmCreation(){
    if (this.timeIsValid) {
      let weekDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      for(var i=0;i<7;i++){
        if(this.result[i].day=="" ) {this.result[i].day = weekDay[i];}
        if(this.result[i].startTime=="edit" || this.result[i].startTime==""){this.result[i].startTime=null;}
        if(this.result[i].endTime=="edit" || this.result[i].endTime==""){this.result[i].endTime=null;}
      }

      let userData      = this.tempCollector;
      let scheduleData  = this.result;
      this.authService.createColPart2(userData, scheduleData);
    }




    //alert('confirm: ' + JSON.stringify(this.result));
    //go to service

  }


  abortMission(){
    //this.authService.cancelCollectorSignup();

  }






}
/*
onClick(selectedCell: any){
  console.log(selectedCell.parentElement.getElementsByClassName("myCol")[0].innerHTML);
  let table     = selectedCell.parentElement;
  let col1      = table.getElementsByClassName("myCol")[0];
  let col2      = table.getElementsByClassName("myCol")[1];
  let col3      = table.getElementsByClassName("myCol")[2];
  let col4      = table.getElementsByClassName("myCol")[3];
  let day       = col1.innerHTML;
  let startTime = col2.innerHTML;
  let endTime   = col3.innerHTML;
  let action    = col4.innerHTML;

  if(action == 'save') {
    //startTime   = col2.getElementsByClassName('timePicker')[0].value;
    //endTime     = col3.getElementsByClassName('timePicker')[0].value;
    col4.innerHTML = 'edit';
    col2.innerHTML = col2.getElementsByClassName('timePicker')[0].value;
    col3.innerHTML = col3.getElementsByClassName('timePicker')[0].value;

  }
  else {
    startTime      = col2.innerHTML;
    endTime        = col3.innerHTML;


    col2.innerHTML = this.timePicker;
    col3.innerHTML = this.timePicker;
    col2.getElementsByClassName('timePicker')[0].value = startTime;
    col3.getElementsByClassName('timePicker')[0].value = endTime;
    col4.innerHTML = 'save';
  }
}*/
