import { Get, Path, Route, Tags } from "tsoa";
import { Service } from "typedi";
import PublicService from "../services/public.service";


@Route("api/public")
@Service()
@Tags("Public")
export default class PublicController {
  constructor (private readonly publicService: PublicService) { }

  @Get("/organization/:organizationId")
  async getOrganizationById(@Path() organizationId: string) {
    return await this.publicService.getOrganizationById(organizationId);
  }

  @Get("/organization-config/:organizationId")
  async getOrganizationConfigById(@Path() organizationId: string) {
    return await this.publicService.getOrganizationConfigById(organizationId);
  }
}