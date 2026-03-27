export interface ApiViolation {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  path: string;
  violations: ApiViolation[] | null;
}
