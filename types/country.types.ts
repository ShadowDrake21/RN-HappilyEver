export interface ICountry {
  id: string;
  name: Name;
  flags: Flags;
  phoneCode: string;
}

export interface Name {
  common: string;
  official: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}
