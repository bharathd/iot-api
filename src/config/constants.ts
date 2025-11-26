export enum Role {
  SystemAdmin = 1,
  Admin = 2,
}

export const roleMap: { [key: number]: string } = {
  [Role.SystemAdmin]: 'System Admin',
  [Role.Admin]: 'Admin',
};