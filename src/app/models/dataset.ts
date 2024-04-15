import * as GeoJSON from 'geojson';

export interface Dataset {
  id?: number;
  name?: string;
  code?: string;
  type?: string;
  extent?: GeoJSON.BBox;
  project?: number;
  data_package?: any;
  record_count?: number;
  description?: string;
}
