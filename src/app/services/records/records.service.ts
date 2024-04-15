import {Inject, Injectable} from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";
import {APIService} from "../api/api.service";
import {PROJECT_NAME} from "../../tokens/app";
import {distinctUntilChanged, firstValueFrom} from "rxjs";
import {StorageService} from "../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(
    @Inject(PROJECT_NAME) private projectName: string,
    private authenticationService: AuthenticationService,
    private apiService: APIService,
    private storageService: StorageService,
  ) {
    // Always clear the stored datasets when the user logs out.
    this.authenticationService.user$.pipe(distinctUntilChanged()).subscribe((user) => {
      if (!user)
        this.clear();
      else
        this.refresh();
    });
  }

  /**
   * Refresh from the API the dataset information into storage.
   */
  async refresh() {
    // Get the datasets from the API Service.
    const datasets = await firstValueFrom(this.apiService.getDatasets());

    // Store each of these datasets in storage.
    await Promise.all(
      datasets.map(dataset => this.storageService.store('Dataset_' + dataset.name, dataset))
    );
  }

  /**
   * Clears all the datasets from storage.
   */
  async clear() {
    const datasets = await this.storageService.getPrefixed('Dataset_');
    await Promise.all(
      Object.keys(datasets).map(key => this.storageService.remove(key)),
    );
  }

  /**
   * Get the dataset by name.
   *
   * @param dataset
   */
  get(dataset: string) {
    return this.storageService.load('Dataset_' + dataset);
  }

  /**
   * Get all the datasets.
   */
  getAll() {
    return this.storageService.getPrefixed('Dataset_');
  }

}
