import { Body, Post, Route, Tags } from "tsoa";
import { Service } from "typedi";
import FasService from "../services/fas.service";
import { CustomerAuthObj } from "../models/interface/fas";


@Route("api/fas")
@Service()
@Tags("FAS")
export default class FasController {
  constructor (private readonly fasService: FasService) {}

  @Post("/init")
  async customerAuthInit(@Body() customerAuth: CustomerAuthObj): Promise<{ customerId: string }> {
    return await this.fasService.customerAuthInit(customerAuth);
  }

  @Post("/verify-otp")
  async verifyCustomerOtp(@Body() body: { customerId: string; otp: string }): Promise<{ authUrl: string }> {
    const { customerId, otp } = body;
    return await this.fasService.verifyCustomerOtp(customerId, otp);
  }
}