import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  standalone: true,
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  imports: [
    IonicModule
  ]
})
export class PhotoComponent  implements OnInit {

  @Input()
  readonly: boolean = false;

  @Input()
  src: string = '';

  constructor() { }

  ngOnInit() {}

}
