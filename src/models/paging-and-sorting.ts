export class PagingAndSortingOptions {
  page: number = 0;
  pageSize: number = 20;
  sortBy!: string;
  sortDir: string = "ASC";
  search?: string = "";
}

export interface PagingAndSortingResult<T> {
  totalPages: number;
  totalElements: number;
  pageOffset: number;
  pageSize: number;
  data: T[]
}