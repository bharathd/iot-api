import { Service } from "typedi";
import dbConfig from "../config/db";
import User  from "../models/entities/user";
import * as bcrypt from "bcrypt";
import { Not, QueryRunner } from "typeorm";
import { Role } from "../config/constants";

@Service()
export default class UserRepository {
  private usersRepo = dbConfig.getRepository(User);

  private async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async verifyPassword(inputPassword: string, storedPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, storedPassword);
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { email, isActive: true } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  public async loginUser(email: string, password: string): Promise<User> {
    const userFull = await this.usersRepo.findOne({ where: { email }, relations: { organization: true } });
    if (!userFull || !(await this.verifyPassword(password, userFull.password))) {
      throw new Error("Invalid email or password");
    }
    if (!userFull.isActive) {
      throw new Error("Your account is disabled");
    }
    return userFull;
  }

  public async changeLoginPassword(userId: string, newPassword: string, oldPassword: string): Promise<boolean> {
    const user = await this.usersRepo.findOne({ where: { userId } });
    if (!user) {
      throw new Error("User not found");
    }
    if (!(await this.verifyPassword(oldPassword, user.password))) {
      throw new Error("Old password is incorrect");
    }
    const newEncryptedPassword = await this.encryptPassword(newPassword);
    const result = await this.usersRepo.update({ userId }, { password: newEncryptedPassword });
    return result.affected ? result.affected > 0 : false;
  }

  public async resetPassword(userId: string, newPassword: string, usingEmailToken: boolean): Promise<boolean> {
    const newEncryptedPassword = await this.encryptPassword(newPassword);
    const result = await this.usersRepo.update({ userId }, { password: newEncryptedPassword });
    return result.affected ? result.affected > 0 : false;
  }

  public getAllUsers(organizationId: string): Promise<User[]> {
    return this.usersRepo.find({
      where: { organizationId, roleId: Not(Role.Admin) },
      relations: { role: true },
    });
  }

  public async getUserById(userId: string): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { userId },
      relations: {
        organization: true,
        role: true,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  public async createUser(user: User, queryRunner?: QueryRunner): Promise<User> {
    user.password = await this.encryptPassword(user.password);
    user.createdDate = Math.floor(Date.now() / 1000);
    const manager = queryRunner ? queryRunner.manager : this.usersRepo.manager;
    return manager.save(User, user);
  }

  public async duplicateUserValidation(email: string, contactNumber: string): Promise<void> {
    const existingUser = await this.usersRepo.findOneBy([{ email }, { contactNumber }]);
    if (existingUser) {
      const errorMessage =
        existingUser.contactNumber == contactNumber
          ? "User already exists with given mobile number."
          : "User already exists with given email address.";
      throw new Error(errorMessage);
    }
  }

  public async updateUserStatus(userId: string, isActive: boolean): Promise<boolean> {
    const result = await this.usersRepo.update({ userId }, { isActive });
    return result.affected ? result.affected > 0 : false;
  }

  public async updateUser(userId: string, user: Partial<User>): Promise<boolean> {
    const { email, contactNumber } = user;
    if (email && contactNumber) {
      const existingUser = await this.usersRepo.findOneBy([{ email, userId: Not(userId) }, { contactNumber, userId: Not(userId) }]);
      if (existingUser) {
        const errorMessage =
          existingUser.contactNumber == contactNumber
            ? "User already exists with given mobile number."
            : "User already exists with given email address.";
        throw new Error(errorMessage);
      }
    } else if (email) {
      const existingUser = await this.usersRepo.findOneBy([{ email, userId: Not(userId) }]);
      if (existingUser) {
        const errorMessage = "User already exists with given email address.";
        throw new Error(errorMessage);
      }
    } else if (contactNumber) {
      const existingUser = await this.usersRepo.findOneBy([{ contactNumber, userId: Not(userId) }]);
      if (existingUser) {
        const errorMessage = "User already exists with given mobile number.";
        throw new Error(errorMessage);
      }
    }
    const result = await this.usersRepo.update({ userId }, user);
    return result.affected ? result.affected > 0 : false;
  }
}
