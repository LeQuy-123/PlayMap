export interface User {
  id: number;
  username: string;
  roles: ('User' | 'Admin' | string)[];
  fullName: string;
  [key: string]: any; // allows future fields without breaking types
}
export type ConfigItem = {
  key: number;
  value: number;
  description: string;
  unit: string | null;
  locale: string;
};

export type Config = {
  [key: string]: ConfigItem;
};

export type ResponseData = {
  token: string;
  user: User;
};
