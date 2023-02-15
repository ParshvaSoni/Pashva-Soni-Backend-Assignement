"use strict";

import express from "express";
import { updateProduct, getAllProduct, createProduct, getProductById, deleteProduct } from "../Controllers/productController.js";
import { createProductValidationSchema } from "../InputValidationSchemas/productInputValidationSchema.js";

export function validateBody(joiSchema) {
    return async (req, res, next) => {
        try {
            const result = await joiSchema.validate(req.body);
            if (result.error) {
                return res.status(422).json({ success: 0, message: result.error.details[0].message.replaceAll('\"', ''), data: null });
            }
            else {
                req.body = result.value;
                next();
            }
        }
        catch (err) {
            return res.status(500).json({ success: 0, message: err.message, data: null });
        }
    }
}

// Init the Router
const productRouter = express.Router();

// Get All Products Routes
productRouter.get('/', getAllProduct);

// Get Product By ID Route
productRouter.get('/:id', getProductById);

// Create New Product Route
productRouter.post('/create', validateBody(createProductValidationSchema), createProduct);

// Delete Product By ID Route
productRouter.delete('/delete/:id', deleteProduct)

// Update Product By ID Route
productRouter.patch('/update/:id', validateBody(createProductValidationSchema), updateProduct)



export default productRouter;