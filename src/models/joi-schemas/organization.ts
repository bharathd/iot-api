import Joi from "joi";

/**
 * @description Joi Schema's for Organization routes
 */
export class OrganizationSchema {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for create organization route
     */
    public static create(): Joi.Schema {
        return Joi.object().keys({
            organizationType: Joi.string().required(),
            organizationName: Joi.string().required(),
            contactPerson: Joi.string().required(),
            contactNumber: Joi.string().required(),
            email: Joi.string().email().required(),
            gstNumber: Joi.string(),
            address: Joi.string().required(),
            password: Joi.string().min(6).required(),
            signature: Joi.string(),
            description: Joi.string().allow('', null),
            image: Joi.string(),
            termsAndConditions: Joi.boolean().required(),
        }).unknown(false);
    }
  public static update(): Joi.Schema {
    return Joi.object()
      .keys({
        organizationName: Joi.string(),
        contactPerson: Joi.string(),
        contactNumber: Joi.string(),
        address: Joi.string(),
        description: Joi.string().allow('', null),
        image: Joi.string(),
        signature: Joi.string().allow('').allow(null),
        gstNumber: Joi.string().allow('', null),
        email: Joi.string().email(),
        organizationType: Joi.string(),
      })
      .unknown(false);
  }

  public static updateBankDetails(): Joi.Schema {
    return Joi.object()
      .keys({
        bankName: Joi.string().required(),
        accountNumber: Joi.number().required(),
        ifscCode: Joi.string().required(),
      })
      .unknown(false);
  }

  /**
   * @description To generate schema
   * @return {Joi.Schema} Joi Schema for request delete organization data route
   */
  public static requestDeleteOrganizationData(): Joi.Schema {
    return Joi.object().keys({
      reason: Joi.string().required(),
    }).unknown(false);
  }
}