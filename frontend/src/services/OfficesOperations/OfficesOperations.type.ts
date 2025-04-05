export interface OfficesEmployeeInventory {
  id: string;
  name: string;
}

export interface UnverifiedUsers {
  id: string;
  email: string;
  fio: string;
}

export interface VerifiedUsers extends UnverifiedUsers {
  role: (
    | "member_union"
    | "member_comitet"
    | "admin"
    | "secretar"
    | "corporative_secretar"
  )[];
}

export interface OfficesUser {
  office_id: string;
  fio: string;
  position: string;
  email: string;
  password?: string;
}

export interface Office {
  id: number;
  voting_datetime: string;
  end_datetime: string;
  place: string;
  is_internal: boolean;
  protocol_datetime: string;
  status: "active" | "completed" | "future";
}

export interface Inventory {
  id: number;
  name: string;
  fio: string | null;
}

export interface Furniture {
  name: string;
  id: number;
  size_x: number;
  size_y: number;
  office_id: number;
  fio: string;
}
