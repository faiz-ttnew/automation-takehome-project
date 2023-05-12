export interface IResponseData {
  product: string;
  price: string;
  link: string;
  search_term: string;
}

export interface IDataCSV {
  title: string;
  price: string;
  search_term: string;
}

export interface IDataSource {
  [key: string]: IDataSourceDetail;
}

export interface IDataSourceDetail {
  baseURL: string;
  parent_ele: string;
  title: string;
  price: string;
  link: string;
}

export interface IRequest {
  search_term: string;
  source: string;
}
export interface IResponse {
  search_term?: string;
  source?: string;
  data?: string;
  message?: string;
  errors?: string;
}
