import { Service } from "typedi";
import dbConfig from "../config/db";
import Organization, { OrganizationConfig } from "../models/entities/organization";
import { QueryRunner } from "typeorm";

@Service()
export default class OrganizationRepository {
  private organizationRepo = dbConfig.getRepository(Organization);
  private organizationConfigRepo = dbConfig.getRepository(OrganizationConfig);

  public async getAllOrganizations(): Promise<Organization[]> {
    const organizations = await this.organizationRepo.find();
    return organizations;
  }

  public async getOrganizationById(organizationId: string): Promise<Organization> {
    const organization = await this.organizationRepo.findOne({ where: { organizationId }, relations: { config: true } });
    if (!organization) {
      throw new Error("Organization not found");
    }
    return organization;
  }

  public async createOrganization(organization: Organization, queryRunner: QueryRunner): Promise<Organization> {
    const createdOrganization = await queryRunner.manager.save(Organization, organization);
    await this.saveOrganizationConfig({ organizationId: createdOrganization.organizationId } as OrganizationConfig);
    return createdOrganization;
  }

  public async updateOrganization(organizationId: string, organization: Partial<Organization>): Promise<boolean> {
    const result = await this.organizationRepo.update({ organizationId }, organization);
    return result.affected ? result.affected > 0 : false;
  }

  public async duplicateOrganizationValidation(email: string, contactNumber: string): Promise<void> {
    const existingOrganization = await this.organizationRepo.findOneBy([{ email }, { contactNumber }]);
    if (existingOrganization) {
      const errorMessage = existingOrganization.contactNumber == contactNumber
        ? 'Organization already exists with given mobile number.'
        : 'Organization already exists with given email address.';
      throw new Error(errorMessage);
    }
  }

  public saveOrganizationConfig(organizationConfig: OrganizationConfig): Promise<OrganizationConfig> {
    return this.organizationConfigRepo.save(organizationConfig);
  }

  public async getOrganizationConfigById(organizationId: string): Promise<OrganizationConfig> {
    const organizationConfig = await this.organizationConfigRepo.findOneBy({ organizationId });
    if (!organizationConfig) {
      throw new Error("Organization configuration not found");
    }
    return organizationConfig;
  }
}