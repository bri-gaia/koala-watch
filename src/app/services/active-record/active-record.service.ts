import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveRecordService {

  values: any = {};
  status: string = "";

  constructor() {
  }

  clear() {
    this.values = {};
    this.status = "";
  }

  getValues() {
    return this.values;
  }

  setValues(values: any) {
    this.values = values;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status: string) {
    this.status = status;
  }
}
