export interface Response<T> {
  status: number;
  data: T;
  message: string;
  errorCode?: number;
}

export interface ResponseArray<T> {
  status: number;
  data: T[];
  message: string;
  errorCode?: number;
}

export interface PaginationParams {
  pageSize: number;
  page: number;
  totalRows: number;
}

export interface ListResponse<T> {
  data: {
    pagination: PaginationParams;
    rows: T[]
  },
  status: number;
  message: string;
  errorCode?: number;
}

export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  [key: string]: any;
}