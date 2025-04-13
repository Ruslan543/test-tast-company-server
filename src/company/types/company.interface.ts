export const COMPANY_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export type CompanyStatus =
  (typeof COMPANY_STATUS)[keyof typeof COMPANY_STATUS];

export interface FileNames {
  fileName: string;
  filePath: string;
  thumbPath: string;
}
