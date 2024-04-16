import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {ActiveRecordService} from "../../services/active-record/active-record.service";
import {Observable} from "rxjs";
import {ClientPhoto} from "../../models/client-photo";
import {IonButton, IonCard, IonCardContent} from "@ionic/angular/standalone";
import {PhotoService} from "../../services/photo/photo.service";
import {PhotoGalleryComponent} from "../photo-gallery/photo-gallery.component";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-record-photos',
  templateUrl: './record-photos.component.html',
  styleUrls: ['./record-photos.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    IonButton,
    IonCard,
    IonCardContent,
    PhotoGalleryComponent,
  ]
})
export class RecordPhotosComponent implements OnInit {

  @Input()
  readonly: boolean = false;

  photos$: Observable<ClientPhoto[]>;

  constructor(
    private activeRecordService: ActiveRecordService,
    private photoService: PhotoService,
  ) {
    this.photos$ = this.activeRecordService.photos$;
  }

  ngOnInit() {
  }

  async doCameraPhoto() {
    await this.photoService.getCameraPhoto();
  }

  async doLibraryPhoto() {
    await this.photoService.getLibraryPhoto();
  }

}
