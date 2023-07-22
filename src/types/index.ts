export interface IMenu {
  title: string;
  key: string;
  path: string;
}

export type IDestination = {
  id: number;
  name: string;
  content: string;
  embed_map: string;
  description: any;
  address: string;
  destination_type: IDestinationType;
  banners: IBanner[];
  created_at: string;
  updated_at: string;
};

export interface IDestinationType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IBanner {
  id: number;
  asset: string;
}

export interface IPackage {
  id: number;
  name: string;
  period: string;
  desciption: string;
  images: Image[];
  conditions: string;
  price: number;
  created_at: string;
  updated_at: string;
  types: string[];
  content: string;
  local_guide: LocalGuide;
  destination_visit: IDestinationVisit;
}

export interface Image {
  id: number;
  asset: string;
  thumbUrl?: string;
  uid?: number;
}

export interface LocalGuide {
  id: number;
  name: string;
}

export interface IDestinationVisit {
  id: number;
  name: string;
}

export interface ICommunity {
  id: number;
  name: string;
  address: string;
  detail: string;
  images: Image[];
  created_at: string;
  updated_at: string;
  content: string;
}

export interface IPartner {
  id: number;
  name: string;
  address: string;
  detail: string;
  phone: string;
  facebook: string;
  type: string;
  status: string;
  images: any[];
  embed_map: any;
  created_at: string;
  updated_at: string;
}
