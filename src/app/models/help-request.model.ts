export type OilChooseRequestModel = {
  name: string,
  phone: string,
  carBrand: string;
  carModel: string;
  year: string;
  engine: string;
  transmission: string;
  date?: string;
};

export type WholesaleRequestModel = {
  name: string;
  company: string;
  inn: string;
  email: string;
  phone: string;
  date?: string;
};

export type CallRequestModel = {
  name: string;
  phone: string;
  date?: string;
};
