import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'admin-manage-material',
  templateUrl: './admin-manage-material.component.html',
  styleUrls: ['./admin-manage-material.component.css'],
})

export class AdminManageMaterialComponent {
  title = 'app';
  constructor(private titleService:Title) {
    this.titleService.setTitle("ESWeb | Manage-Material"
    );}

}
