export type EmployeeRole =
  | "member_union"
  | "member_comitet"
  | "admin"
  | "secretar"
  | "corporative_secretar";

export interface VerifiedUser {
  id: string;
  email: string;
  fio: string;
  roles: EmployeeRole[];
}

export interface UnVerifiedUser {
  id: string;
  email: string;
  fio: string;
}
