export interface LoginUserObj {
    email: string;
    password: string;
}

export interface ChangeLoginPasswordObj {
    userId: string;
    newPassword: string;
    oldPassword: string;
}

export interface CreateUserObj {
    roleId: number;
    fullName: string;
    contactNumber: string;
    email: string;
    password: string;
}

export interface UpdateUser {
    email: string;
    contactNumber: string;
    fullName: string;
    roleId: number;
    isActive: boolean;
}