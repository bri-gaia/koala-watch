export interface User {
  id?: number;
  last_login?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_admin?: boolean;
  is_data_engineer?: boolean;
  date_joined?: string;
  groups?: any[] | null;
  user_permissions?: any[] | null;
}
