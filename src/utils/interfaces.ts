export interface PoapEvent {
  id: number;
  fancy_id: string;
  name: string;
  event_url: string;
  image_url: string;
  country: string;
  city: string;
  description: string;
  year: number;
  start_date: string;
  end_date: string;
  expiry_date: string;
}

export interface PoapSupply {
  total: number;
  order: number;
}

export interface PoapToken {
  event: PoapEvent;
  tokenId: string;
  owner: string;
  layer: string;
  created: string;
  supply: PoapSupply;
}