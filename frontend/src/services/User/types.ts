export interface User {
  fio: string;
  email: string;
  role: (
    | "member_union"
    | "member_comitet"
    | "admin"
    | "secretar"
    | "corporative_secretar"
  )[];
}
