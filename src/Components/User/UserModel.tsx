export interface UserModel {
  id: number,
  userName: string,
  name: string,
  avatar: string,
  email: string,
  phone: string,
  status: number,
  listRoles: ListRoles[]
}

interface ListRoles {
  roleId: number;
  roleName: string;
}