import {Component, Input, OnInit} from '@angular/core';
import {IonButton, IonIcon, IonInput, IonItem, IonItemDivider, IonItemGroup, IonLabel} from "@ionic/angular/standalone";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-location-field',
  templateUrl: './location-field.component.html',
  styleUrls: ['./location-field.component.scss'],
  standalone: true,
  imports: [
    IonItemGroup,
    IonItemDivider,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
    NgIf,
    NgForOf
  ]
})
export class LocationFieldComponent implements OnInit {

  @Input()
  readonly: boolean = false;


  constructor() {
  }

  ngOnInit() {
  }

}
