import { Service } from "typedi";
import OrganizationRepository from "../repositories/organization.repository";
import Organization from "../models/entities/organization";
import { CreateOrganizationObj } from "../models/interface/organization";
import UserRepository from "../repositories/user.repository";
import dbConfig from "../config/db";
import { Role } from "../config/constants";
import User from "../models/entities/user";

@Service()
export default class OrganizationService {
  constructor(
    private organizationRepository: OrganizationRepository,
    private userRepository: UserRepository,
  ) { }

  public async getAllOrganizations(): Promise<Organization[]> {
    return await this.organizationRepository.getAllOrganizations();
  }

  public async getOrganizationById(id: string): Promise<Organization> {
    return await this.organizationRepository.getOrganizationById(id);
  }

  public async createOrganization(
    organizationObj: CreateOrganizationObj,
  ): Promise<boolean> {
    const {
      organizationType, organizationName, contactPerson, contactNumber,
      email, gstNumber, address, password, image, termsAndConditions, description
    } = organizationObj;

    // Validate for duplicate organization and user
    await Promise.all([
      this.organizationRepository.duplicateOrganizationValidation(email, contactNumber),
      this.userRepository.duplicateUserValidation(email, contactNumber),
    ]);

    const createdDate = Math.floor(Date.now() / 1000);

    // Create organization
    const organization = new Organization();
    Object.assign(organization, {
      organizationType, organizationName, contactPerson, contactNumber, image, termsAndConditions, description,
      email, gstNumber, address, createdDate
    });
    const queryTransaction = dbConfig.createQueryRunner();
    await queryTransaction.connect();
    await queryTransaction.startTransaction();
    try {
      const { organizationId } = await this.organizationRepository.createOrganization(organization, queryTransaction);

      // Create admin user
      const user = new User();
      Object.assign(user, {
        roleId: Role.Admin, fullName: contactPerson, contactNumber,
        email, password, organizationId,
      });

      await this.userRepository.createUser(user, queryTransaction);
      await queryTransaction.commitTransaction();
      return true;
    } catch (error) {
      await queryTransaction.rollbackTransaction();
      throw error;
    } finally {
      await queryTransaction.release();
    }
  }

  public updateOrganization(organizationId: string, organization: Partial<Organization>): Promise<boolean> {
    return this.organizationRepository.updateOrganization(organizationId, organization);
  }
}
