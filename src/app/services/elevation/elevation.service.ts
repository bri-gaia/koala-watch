import {Inject, Injectable} from '@angular/core';
import {GOOGLE_API_KEY} from "../../tokens/api";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ElevationService {

  constructor(
    @Inject(GOOGLE_API_KEY) private googleApiKey: string,
    private httpClient: HttpClient,
  ) {
  }

  public async getElevation(latitude: number, longitude: number): Promise<number | null> {
    const url = `https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=${this.googleApiKey}`;
    return firstValueFrom(this.httpClient.get(url).pipe(
      map((elevation: any) => {
        if (!elevation['results'] || !elevation['result'][0]) return null;
        const result = elevation[0];
        if (result['elevation'] === undefined || result['elevation'] === null) return null;
        return parseInt(result['elevation'], 10);
      }),
    ));
  }

}
