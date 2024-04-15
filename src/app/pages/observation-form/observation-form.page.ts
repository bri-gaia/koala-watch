import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RecordFormComponent} from "../../components/record-form/record-form.component";

@Component({
  selector: 'app-observation-form-page',
  templateUrl: './observation-form.page.html',
  styleUrls: ['./observation-form.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSegment, IonSegmentButton, IonButtons, IonMenuButton, IonButton, RecordFormComponent]
})
export class ObservationFormPage implements OnInit {

  @Input()
  readonly: boolean = false;

  segment: string = 'form';

  constructor() {
  }

  ngOnInit() {
  }

}
