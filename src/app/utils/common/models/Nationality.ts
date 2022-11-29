export interface Nationality {
  id?: string;
  nameEn?: string;
  nameAr?: string;
  flagImageUrl?: boolean;
  isSelected?: boolean;
}

export interface City {
  id: string;
  nameEn?: string;
  nameAr?: string;
  countryId?: number;
  isSelected?: boolean;
}

export interface Coord {
  lat: number;
  lng: number;
}