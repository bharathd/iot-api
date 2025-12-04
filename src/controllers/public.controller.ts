import { Get, Route, Tags } from "tsoa";
import { Service } from "typedi";
import PublicService from "../services/public.service";


@Route("api/public")
@Service()
@Tags("Public")
export default class PublicController {
  constructor (private readonly publicService: PublicService) { }

  @Get("/organization-config/:organizationId")
  async getOrganizationConfigById(organizationId: string) {
    return await this.publicService.getOrganizationConfigById(organizationId);
  }
}