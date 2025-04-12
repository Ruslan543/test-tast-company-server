export const COMPANY_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export type CompanyStatus =
  (typeof COMPANY_STATUS)[keyof typeof COMPANY_STATUS];
