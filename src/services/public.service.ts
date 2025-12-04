import { Service } from "typedi";
import OrganizationService from "./organization.service";


@Service()
export default class PublicService {
  constructor(private readonly organizationService: OrganizationService) { }

  public async getOrganizationById(organizationId: string) {
    return this.organizationService.getOrganizationById(organizationId);
  }

  public async getOrganizationConfigById(organizationId: string) {
    return this.organizationService.getOrganizationConfigById(organizationId);
  }
}