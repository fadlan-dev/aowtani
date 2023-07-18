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
