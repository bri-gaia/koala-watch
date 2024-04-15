import * as GeoJSON from 'geojson';

export interface Record {
  id?: number;
  client_id?: string;
  dataset?: number;
  site?: number | null;
  source_info?: { [key: string]: string | number };
  last_modified?: string;
  created?: string;
  data?: { [key: string]: any } | null;
  validated?: boolean;
  locked?: boolean;
  datetime?: string;
  geometry?: GeoJSON.Geometry | null;
  species_name?: string;
  name_id?: number;
  parent?: number;
  children?: number[];
}
