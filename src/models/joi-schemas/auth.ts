import Joi from "joi";

/**
 * @description Joi Schema for Auth route
 */
export class AuthSchema {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for login route
     */
    public static login(): Joi.Schema {
        return Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        }).unknown(false);
    }

    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for forgot password route
     */
    public static forgotPassword(): Joi.Schema {
        return Joi.object().keys({
            email: Joi.string().email().required(),
        }).unknown(false);
    }

    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for verify otp route
     */
    public static verifyOtp(): Joi.Schema {
        return Joi.object().keys({
            email: Joi.string().email().required(),
            otp: Joi.string().required(),
        }).unknown(false);
    }

    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for reset password route
     */
    public static resetPassword(): Joi.Schema {
        return Joi.object().keys({
            token: Joi.string().required(),
            password: Joi.string().min(6).required(),
        }).unknown(false);
    }
}