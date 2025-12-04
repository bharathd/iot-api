import { Service } from "typedi";
import User from "../models/entities/user";
import UserRepository from "../repositories/user.repository";
import { CreateUserObj, UpdateUser } from "../models/interface/user";

@Service()
export default class UserService {
  constructor(private userRepository: UserRepository) { }

  public async getAllUsers(organizationId: string): Promise<User[]> {
    return this.userRepository.getAllUsers(organizationId);
  }

  public getUserById(userId: string): Promise<User> {
    return this.userRepository.getUserById(userId);
  }

  public async createUser(userObj: CreateUserObj, organizationId: string): Promise<boolean> {
    await this.userRepository.duplicateUserValidation(userObj.email, userObj.contactNumber);

    const newUser = new User();
    Object.assign(newUser, { ...userObj, organizationId });

    await this.userRepository.createUser(newUser);
    return true;
  }

  public async updateUserStatus(userId: string, isActive: boolean): Promise<boolean> {
    return this.userRepository.updateUserStatus(userId, isActive);
  }

  public async updateUser(userId: string, userObj: UpdateUser): Promise<boolean> {
    return await this.userRepository.updateUser(userId, userObj);
  }

  public changeLoginPassword(userId: string, newPassword: string, oldPassword: string): Promise<boolean> {
    return this.userRepository.changeLoginPassword(userId, newPassword, oldPassword);
  }
}
