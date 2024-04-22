import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { StorageService } from "../storage/storage.service";
import { APIService } from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private storageService: StorageService,
    private apiService: APIService,
  ) {
  }

  upload(): Observable<object| null> {
    return this.storageService.getUploadableRecords().pipe(
      map(clientRecord => {
        // TODO need to subscribe? what to do with this?
        return this.apiService.createRecord(clientRecord).subscribe(data => console.log(data))
      })
    );
  }

}
