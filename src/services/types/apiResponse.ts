export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface ErrorResponse {
  message: string;
  code?: number;
  status?: number;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalEvents: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  sortBy: string;
  sortOrder: string;
}

export interface ErrorPayload {
    message: string;
    code?: number;
}

export interface FailedRequest {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}