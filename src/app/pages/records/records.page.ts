import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton, IonTabBar, IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {APIService} from "../../services/api/api.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-records',
  templateUrl: './records.page.html',
  styleUrls: ['./records.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonTabs, IonTabButton, IonTabBar]
})
export class RecordsPage implements OnInit {

  records$: Observable<any>;

  constructor(
    private apiService: APIService,
  ) {
    this.records$ = this.apiService.getDatasets();
  }

  ngOnInit() {
  }

}
