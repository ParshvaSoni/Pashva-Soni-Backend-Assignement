"use strict";

import joi from '@hapi/joi';

export const createProductValidationSchema = joi.object({
    title: joi.string()
        .label("Product Title")
        .min(4)
        .max(100)
        .lowercase()
        .required()
        .regex(/[${};<>`]/, { invert: true })
        .trim()
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
        }),
    description: joi.string()
        .label("Product Description")
        .min(4)
        .max(500)
        .lowercase()
        .required()
        .regex(/[${};<>`]/, { invert: true })
        .trim()
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
        }),
    category: joi.string()
        .label("Product category")
        .valid('toys', 'mens cloths', 'women cloths', 'electronics', 'jewellery')
        .lowercase()
        .trim()
        .required()
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
        }),
    imageURL: joi.string()
        .label("Product Image URL")
        .trim()
        .min(5)
        .max(500)
        .required(),
    price: joi.number()
        .label("Product Price")
        .positive()
        .greater(0)
        .required(),
    rating:joi.object({
        rate:joi.number()  
            .label("Product Rating Rate")
            .positive()
            .greater(0)
            .max(5),
        views:joi.number()
            .label("Product Rating View")
            .positive()
            .greater(0)
    })
});
