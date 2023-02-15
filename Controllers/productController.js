"use strict";

import Product from "../Models/productSchema.js";
import mongoose from "mongoose";

// get all the products
export const getAllProduct = async (req, res, next) => {
    try {
        let tempproduct = await Product.find();
        res.status(200).json({ success: 1, message: "Products Retrieved Successfully.", data: tempproduct })
    }
    catch (err) {
        return res.status(500).json({ success: 0, message: err.message, data: null });
    }
}

export const getProductById = async (req, res, next) => {
    let tempproduct;
    try {
        if (mongoose.isValidObjectId(req.params.id)) // checking if the user passed ID is valid
        {
            tempproduct = await Product.findById(req.params.id); // checking if Product with this id exist 
            if (tempproduct == null) {
                return res.status(404).json({ success: 0, message: "No Product with this ID available.", data: null });
            }
            else {
                res.status(200).json({ success: 1, message: "Product Reterived successfully.", data: tempproduct })
            }
        }
        else {
            return res.status(400).json({ success: 0, message: "Invalid Product-ID.", data: null });
        }
    }
    catch (err) {
        return res.status(500).json({ success: 0, message: err.message, data: null });
    }
}

//update product by ID
export const updateProduct = async (req, res) => {
    try {
        let tempproduct
        if (mongoose.isValidObjectId(req.params.id)) // checking if the user passed ID is valid
        {
            tempproduct = await Product.findById(req.params.id); // checking if Product with this id exist 
            if (tempproduct == null) {
                return res.status(404).json({ success: 0, message: "No Product with this ID available." });
            }
            else {
                tempproduct.title = req.body.title,
                tempproduct.description = req.body.description
                tempproduct.imageURL = req.body.imageURL
                tempproduct.price = req.body.price
                tempproduct.category = req.body.category
                tempproduct.rating = req.body.rating
                const result = await tempproduct.save();
                res.status(202).json({ success: 1, message: "Product Updated successfully.", data: result })
            }
        }
        else {
            return res.status(400).json({ succes: 0, message: "Invalid Product-ID.", data: null });
        }
    }
    catch (err) {
        if (err.name === 'MongoServerError' && err.code === 11000) {
            return res.status(406).json({ success: 0, message: "Product with the given name already exist." });
        }
        else {
            return res.status(500).json({ success: 0, message: err.message, data: null });
        }
    }
}


//delete product by ID
export const deleteProduct = async (req, res) => {
    let tempproduct
    try {
        if (mongoose.isValidObjectId(req.params.id)) // checking if the user passed ID is valid
        {
            tempproduct = await Product.findById(req.params.id); // checking if Product with this id exist 
            if (tempproduct == null) {
                return res.status(404).json({ success: 0, message: "No Product with this ID available." });
            }
            else {
                await tempproduct.remove();
                res.status(200).json({ success: 1, message: "Product deleted successfully.", data: null })
            }
        }
        else {
            return res.status(400).json({ success: 0, message: "Invalid Product-ID.", data: null });
        }
    }
    catch (err) {
        return res.status(500).json({ success: 0, message: err.message, data: null });
    }
}


//create new product
export const createProduct = async (req, res) => {
    try {
        const temp = new Product({
            title: req.body.title,
            category: req.body.category,
            image: req.body.image,
            price: req.body.price,
            description: req.body.description,
        });
        const newProduct = await temp.save();
        res.status(200).json({ success: 1, message: "Product created successfully.", data: newProduct });
    }
    catch (err) {
        if (err.name === 'MongoServerError' && err.code === 11000) {
            return res.status(406).json({ success: 0, message: "Product with the given name already exist.", data: null });
        }
        else {
            return res.status(500).json({ success: 0, message: err.message, data: null });
        }
    }
}

