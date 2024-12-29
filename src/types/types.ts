export interface Permission {
  id: string;
  name: string;
}

export interface UserPermissionsData {
  id: number;
  nome: string;
  email: string;
  role: string;
  isActive: boolean;
  telefone: string;
  username: string;
}

export interface CreateUserData {
  id?: number;
  nome: string;
  email: string;
  role: string;
  isActive: boolean;
  telefone: string;
  username: string;
  password: string;
  numeroMatricula: string;
}

export const allPermissions: Permission[] = [
  { id: "view_dashboard", name: "View Dashboard" },
  { id: "edit_users", name: "Edit Users" },
  { id: "view_reports", name: "View Reports" },
  { id: "manage_projects", name: "Manage Projects" },
];
