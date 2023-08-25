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
  id: number | string;
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
  detail?: string | null;
  address: string;
  status: string;
  created_at: string;
  updated_at: string;
  community: ICommunity;
  experience: string;
  profile?: Profile;
  id_card_pdf?: IdCardPdf;
  house_registration_pdf?: HouseRegistrationPdf;
  certificate_pdf: ICertificatePdf | null;
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

export interface IUser {
  id?: number;
  username: string;
  name_title: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  post_code: string;
  created_at?: string;
  updated_at?: string;
  profile: IImage;
  token?: string;
}

export interface IUpdateCustomerRequest {
  username: string;
  password: string;
  name_title: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  post_code: string;
  profile: Profile;
}

export interface IBookingRequest {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  quantity: number;
  note: string;
  package_id: number;
  local_guide_id: number;
  tour_date: string;
  price: number;
  slip: IImage;
}

export interface IReview {
  id: number;
  text: string;
  images: IImage[];
  star: number;
  is_shown: boolean;
  created_at: string;
  updated_at: string;
  customer?: {
    id: number;
    first_name: string;
    last_name: string;
    created_at: string;
    updated_at: string;
    profile: IImage;
  };
  reply: IReply[];
}

export interface IReply {
  id: number;
  text: string;
  images?: IImage[];
  user_id: number;
  created_at: string;
  updated_at: string;
  user: { id: number; username: string; fullname: string };
}

export interface IReviewRequest {
  text: string;
  star: number;
  images: IImage[];
  customer_id: number;
}

export interface IOrderRequest {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  quantity: number;
  order_at: string;
  product_id: number;
  slip: IImage;
}
