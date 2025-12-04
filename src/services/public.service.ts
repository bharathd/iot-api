import { Entity } from "typeorm";
import OrganizationService from "./organization.service";


@Entity()
export default class PublicService {
  constructor (private readonly organizationService: OrganizationService) { }

  public async getOrganizationConfigById(organizationId: string) {
    return this.organizationService.getOrganizationConfigById(organizationId);
  }
}