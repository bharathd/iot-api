import Joi from "joi";

/**
 * @description Joi Schema's for Fas routes
 */
export class FasSchema {
  public static customerAuthInit(): Joi.Schema {
    return Joi.object().keys({
      customerName: Joi.string().required(),
      mobileNumber: Joi.number().required(),
      fasToken: Joi.string().required(),
      organizationId: Joi.string().required(),
    }).unknown(false);
  }
  public static verifyCustomerOtp(): Joi.Schema {
    return Joi.object().keys({
      customerId: Joi.string().required(),
      otp: Joi.string().required(),
    }).unknown(false);
  }
}