import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { ClientRecord } from "../../models/client-record";
import { StorageService } from "../../services/storage/storage.service";

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgIf,
    NgForOf,
    DatePipe
  ]
})
export class RecordsListComponent implements OnInit {

  RECORD_COMPLETE = '#ebffef';
  RECORD_INCOMPLETE = '#ebf6ff';
  RECORD_UPLOADED = '#ebf0df';

  @Input()
  showLegend: boolean = true;

  @Input()
  datasetPrefix: string = "";

  @Input()
  datasetIcon: string = "";

  @Input()
  countIcon: string = "";

  _records: { data: ClientRecord, statusColor: string, altText: string }[] = [];

  @Output()
  onRecordClicked = new EventEmitter<ClientRecord>();

  protected clientRecords$: any[] = [];

  constructor(
    private storageService: StorageService,
  ) {
  }

  ngOnInit() {
    this.storageService.getAllRecords().then((clientRecord) => {
      if (Array.isArray(clientRecord)) {
        clientRecord.forEach(record => this._records.push({
          data: record,
          statusColor: this.getStatusColor(record),
          altText: this.getAltText(record)
        }));
      }
    });
  }

  public getStatusColor(record: ClientRecord) {
    if (record.id) {
      return this.RECORD_UPLOADED;
    }
    return record.valid ? this.RECORD_COMPLETE : this.RECORD_INCOMPLETE;
  }

  public getAltText(record: ClientRecord): string {
    let rv = this.datasetPrefix + ' ';
    if (record.id) {
      rv += 'uploaded';
    } else {
      rv += record.valid ? 'complete but not uploaded' : 'incomplete';
    }
    return rv;
  }

  /*
  public getDatasetIcon(record: ClientRecord): string {
    switch (record.datasetName) {
      case DATASET_NAME_OBSERVATION:
        return 'assets/imgs/eye.png';
      case DATASET_NAME_CENSUS:
        return 'assets/imgs/trees.png';
      case DATASET_NAME_TREESURVEY:
        return 'assets/imgs/tree.png';
      default:
        return 'assets/imgs/koala.png';
    }
  }

  public getCountIcon(record: ClientRecord): string {
    switch (record.datasetName) {
      case DATASET_NAME_OBSERVATION:
        return 'assets/imgs/koala.png';
      case DATASET_NAME_CENSUS:
        return 'assets/imgs/tree.png';
      case DATASET_NAME_TREESURVEY:
        return 'assets/imgs/koala.png';
      default:
        return 'assets/imgs/koala.png';
    }
  }
   */

  doRecordClicked(record: ClientRecord) {
    this.onRecordClicked.emit(record);
  }

}
