export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, { official: string; common: string }>;
  };
  cca3: string;
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  borders?: string[];
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  tld?: string[];
  currencies: Record<string, { name: string; symbol: string }>;
  languages: Record<string, string>;
}
