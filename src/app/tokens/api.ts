import { InjectionToken } from "@angular/core";

export const API_URL = new InjectionToken<string>('The url used for the api requests');
export const GOOGLE_API_KEY = new InjectionToken<string>('The API used for google map requests');
