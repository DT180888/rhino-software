export interface BaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: string[];
}

export interface BaseListResponse<T> extends BaseResponse<T[]> {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}
