export const ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type TypeRoles = (typeof ROLES)[keyof typeof ROLES];
