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
  description: string;
  address: string;
  destination_type: IDestinationType;
  banners: IBanner[];
  created_at: string;
  updated_at: string;
  organization: IOrganization;
};

export interface IOrganization {
  id: number;
  name: string;
  address: string;
  detail: string;
  president_name: string;
  website: string;
  phone: string;
  created_at: string;
  updated_at: string;
  banner: IImage;
  logo: IImage;
}

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
  images: IImage[];
  conditions: string;
  price: number;
  created_at: string;
  updated_at: string;
  types: string[];
  content: string;
  local_guide: LocalGuide;
  destination_visit: IDestinationVisit;
}

export interface IImage {
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
  organization_id: number;
  created_at: string;
  updated_at: string;
  images: IImage[];
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
  images: IImage[];
  embed_map: any;
  created_at: string;
  updated_at: string;
}

export interface IProduct {
  id: number;
  name: string;
  images: IImage[];
  sku: string;
  stock: number;
  price: number;
  price_before_discount: number;
  created_at: string;
  updated_at: string;
  details: string;
}

export interface ILocalGuide {
  id: number;
  name: string;
  phone: string;
  facebook: string;
  detail?: string;
  address: string;
  status: string;
  created_at: string;
  updated_at: string;
  community: ICommunity;
  experience: string;
  profile?: Profile;
  id_card_pdf?: IdCardPdf;
  house_registration_pdf?: HouseRegistrationPdf;
  certificate_pdf?: ICertificatePdf;
}

export interface ICertificatePdf {
  id: number;
  asset: string;
}

export interface Profile {
  id: number;
  asset: string;
}

export interface IdCardPdf {
  id: number;
  asset: string;
}

export interface HouseRegistrationPdf {
  id: number;
  asset: string;
}
