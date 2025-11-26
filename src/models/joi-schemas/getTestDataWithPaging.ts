import Joi from "joi";

/**
 * @description Joi Schema for getTestDataWithPagingAndSorting route
 */
export class GetTestDataWithPaging {
    /**
     * @description To generate schema
     * @return {Joi.Schema} Joi Schema for getTestDataWithPagingAndSorting route
     */
    public static schema(): Joi.Schema {
        return Joi.object().keys({
            page: Joi.number(),
            pageSize: Joi.number(),
            sortBy: Joi.string(),
            sortDir: Joi.string().valid("ASC", "DESC"),
        }).unknown(false);
    }
}