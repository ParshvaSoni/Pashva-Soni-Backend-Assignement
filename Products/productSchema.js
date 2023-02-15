"use strict";

import {mongoose} from "mongoose";

const CATEGORY_ENUM = ['toys','mens cloths','women cloths','electronics','jewellery'];


const productSchema =new mongoose.Schema({
    title:{
        type:String,
        minlength:[5,"Product Name should be minimum 5 character long !"],
        maxlength:[100,"Product Name should be maximum 100 character long !"],
        unique:true,
        required:[true,"Product Name is required !"],
    },
    description:{
        type:String,
        minlength:[5,"Product Description should be minimum 5 character long !"],
        maxlength:[600,"Product Description should be maximum 500 character long !"],
        required:[true,"Product Description is required !"],
    },
    imageURL:{
        type:String,
        // required:[true,"Product Image URL is required !"],
    },
    price:{
        type:Number,
        default:0,
        min:[0,"Minimum Product Like should be 0 !"],
    },
    category:{
        type:String,
        enum:{
            values:CATEGORY_ENUM,
            message:"Product Target Gender should be one of 'men', 'women', 'kids' or 'unisex' !"},
        required:[true,"Product Target Gender is required !"]
    },
    rating:{
        rate:{
            type:Number,
            default:Math.floor(Math.random() * 5) + 1,
            min:[0,"Minimum Rate should be 0 !"],
        },
        views:{
            type:Number,
            default:Math.floor(Math.random() * 1000) + 500,
            min:[0,"Minimum views should be 0 !"],
        }
    }


},{ timestamps: true });

// for try to search keywords in prodct name and description
productSchema.index({title:'text',description:'text'});

const Product=mongoose.model('Products',productSchema);

export default Product;