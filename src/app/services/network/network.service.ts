import {Injectable} from '@angular/core';
import {Network} from "@capacitor/network";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private _status = new BehaviorSubject<boolean>(false);
  public status = this._status.asObservable();

  constructor() {
    Network.getStatus().then((status) => {
      this._status.next(status.connected);
    });
    Network.addListener("networkStatusChange", (status) => {
      this._status.next(status.connected);
    });
  }
}
