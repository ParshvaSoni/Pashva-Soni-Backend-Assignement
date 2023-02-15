"use strict";

import express from "express";
import { updateProduct, getAllProduct, createProduct, getProductById, deleteProduct } from "../Controllers/productController.js";
import { createProductValidationSchema } from "../InputValidationSchemas/productInputValidationSchema.js";

// For Validating Incoming Body Using JOI
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
productRouter.get('/all', getAllProduct);

// Get Product By ID Route
productRouter.get('/:id', getProductById);

// Create New Product Route
productRouter.post('/create', validateBody(createProductValidationSchema), createProduct);

// Delete Product By ID Route
productRouter.delete('/delete/:id', deleteProduct)

// Update Product By ID Route
productRouter.patch('/update/:id', validateBody(createProductValidationSchema), updateProduct)



export default productRouter;

// ===============================> Creating Schemas for Swagger Documentation <================================
/**
 * @swagger
 * components:
 *   schemas:
 *     Products:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - imageURL
 *         - price
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product.
 *         title:
 *           type: string
 *           description: The title of your product.
 *         description:
 *           type: string
 *           description: The description of your product.
 *         imageURL:
 *           type: string
 *           description: The image URL of the product.
 *         price:
 *           type: number
 *           description: The price of the product.
 *         category: 
 *            type: string
 *            description: Category of the product.
 *            enum:
 *              - toys
 *              - electronics
 *              - mens cloths
 *              - women cloths
 *              - jewellery
 *         ratings: 
 *              type: object
 *              properties:
 *                  rate:
 *                      type: number
 *                      description: Overall Rating of the product
 *                  views:
 *                      type: number
 *                      description: Total views of the product
 *       example:
 *         title: Mens Casual Premium Slim Fit T-Shirts
 *         description: Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.
 *         imageURL: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
 *         price: 5000
 *         category: mens cloths
 */


// =========================>  Routes OR Operation For Swagger Documentation <============================== 

// Create Product Swagger Docs _____________________________________________________________________________
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The prodcuts managing API
 * /products/create:
 *   post:
 *     summary: Create New Product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *     responses:
 *       202:
 *         description: Response of successfull product creation.
 *       500:
 *         description: Some server error
 *       406:
 *         description: Response when product with same title already exist.
 *       422:
 *         description: Response when user request body is not valid, and have some mistakes.
 *
 */


// Delete Product Swagger Docs _____________________________________________________________________________
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The prodcuts managing API
 * /products/delete/{id}:
 *   delete:
 *     summary: Delete Existing Product
 *     tags: [Products]
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *     responses:
 *       200:
 *         description: Response of successfull product deletion.
 *       500:
 *         description: Some server error.
 *       404:
 *         description: No product with the given id exist.
 *       400:
 *         description: Provided Product ID is invalid.
 *
 */
 
// Update Product Swagger Docs ______________________________________________________________________________
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The prodcuts managing API
 * /products/update/{id}:
 *   patch:
 *     summary: Update Existing Product
 *     tags: [Products]
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *     responses:
 *       202:
 *         description: Response of successfull product updation.
 *       500:
 *         description: Some server error
 *       406:
 *         description: Response when product with same title already exist.
 *       422:
 *         description: Response when user request body is not valid, and have some mistakes.
 *       404:
 *         description: No product with the given id exist.
 *       400:
 *         description: Provided Product ID is invalid.
 *
 */

// Get All Products Swagger Docs ___________________________________________________________________________
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The prodcuts managing API
 * /products/all:
 *   get:
 *     summary: Get All Product
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Response of successfull product retrival.
 *       500:
 *         description: Some server error.
 *
 */

// Get Product By ID Swagger Docs __________________________________________________________________________
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The prodcuts managing API
 * /products/{id}:
 *   get:
 *     summary: Get Product By ID
 *     tags: [Products]
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *     responses:
 *       200:
 *         description: Response of successfull product retrival.
 *       500:
 *         description: Some server error.
 *       404:
 *         description: No product with the given id exist.
 *       400:
 *         description: Provided Product ID is invalid.
 *
 */