export interface Pagination {
  CurrentPage: number;
  TotalPages: number;
  PageSize: number;
  HasPrevious: boolean;
  HasNext: boolean;
}
