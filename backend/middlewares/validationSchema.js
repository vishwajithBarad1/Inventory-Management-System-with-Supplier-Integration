const Joi = require('@hapi/joi')

const authSchema = Joi.object({
    name: Joi.string().regex(/^[A-Za-z\s]+$/).min(3).required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
});

const productSchema = Joi.object({
    name:Joi.string().regex(/^[A-Za-z\s]+$/).required(), 
    sku:Joi.string().required(),
    description:Joi.string().required(), 
    price:Joi.number().positive().required(), 
    current_stock:Joi.number().positive().required(), 
    reorder_level:Joi.number().positive().required(),
    supplier_id:Joi.string().required()
});

const supplierSchema = Joi.object({
    name: Joi.string().regex(/^[A-Za-z\s]+$/).required(),
    contact_info: Joi.string().regex(/^\+[0-9][0-9] \d{10}$/).required()
});

const orderSchema = Joi.object({
    product_id: Joi.string().required(), 
    quantity: Joi.number().positive().required()
});

module.exports = {
    authSchema,
    productSchema,
    supplierSchema,
    orderSchema
}
