import { BaseResponse } from './base-response.model';

export interface BasePagedResponse<T> extends BaseResponse<T> {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}
