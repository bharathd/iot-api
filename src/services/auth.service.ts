import { Service } from 'typedi';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/user.repository';
import UserService from './user.service';
import User from '../models/entities/user';

@Service()
export default class AuthService {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  public async loginUser(email: string, password: string): Promise<{userDetails: User, token: string}> {
    const userFull =  await this.userRepository.loginUser(email, password);
    const userDetails = await this.userService.getUserById(userFull.userId);
    const token = this.generateJwtToken(userFull);
    return { userDetails, token };
  }

  public generateJwtToken(user: User): string {
    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        roleId: user.roleId,
        password: user.password,
      },
      process.env.JWT_SECRET || 'dHfrN4yHGxQl4W4euT3lLGl7Lvx1b8j1',
      { expiresIn: '10h' }
    );
    return token;
  }
}
