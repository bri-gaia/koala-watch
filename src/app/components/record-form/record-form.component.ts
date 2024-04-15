import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClientRecord} from "../../models/client-record";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormDescriptor} from "../../models/form-descriptor";
import {DatasetService} from "../../services/dataset/dataset.service";
import {FormGeneratorService} from "../../services/form-generator/form-generator.service";
import {JsonPipe} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.scss'],
  imports: [
    JsonPipe
  ]
})
export class RecordFormComponent implements OnInit, OnChanges {

  @Input()
  readonly: boolean = false;

  @Input()
  dataset: string = "";

  record: ClientRecord = {
    valid: false,
    count: 0,
    datasetName: "",
    datetime: "",
    photoIds: [],
  };

  form: FormGroup;
  fields?: FormDescriptor;

  constructor(
    private formBuilder: FormBuilder,
    private datasetService: DatasetService,
    private formGeneratorService: FormGeneratorService,
  ) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit() {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['dataset']) {
      await this.loadDataset();
    }
  }

  async loadDataset() {
    this.form = this.formBuilder.group({});
    this.fields = undefined;

    if (!this.dataset) return Promise.resolve();

    const dataset = await this.datasetService.get(this.dataset);
    if (!dataset) return Promise.resolve();

    this.form = this.formGeneratorService.getFormGroup(this.formBuilder, dataset);
    this.fields = this.formGeneratorService.getFormFields(dataset);
  }
}
