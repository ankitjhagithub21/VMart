const Product = require("../models/product")
const User = require("../models/user")

const isAdmin = async(userId) =>{
   
        const user = await User.findById(userId)
        if(!user || !user.isAdmin){
            return false;
        }
        
    
    return true;

}

const addProduct = async(req,res) =>{
    try{
        
        const result = await isAdmin(req.userId)

        if(!result){
           return res.status(401).json({
                success:false,
                message:"You are not an admin."
            })
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image.",
            });
        }

        const imageUrl = req.file.path;

        // Create a new product with the image URL
        const product = new Product({
            ...req.body, // Spread the other fields from the request body
            image: imageUrl // Store the Cloudinary URL in the 'image' field
        });


        await product.save()

        res.status(201).json({
            success:true,
            message:"Product created successfully.",
            product
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const deleteProduct = async(req,res) =>{
    try{
        const result = await isAdmin(req.userId)
        if(!result){
            return res.status(401).json({
                success:false,
                message:"You are not an admin."
            })
        }

        const {productId} = req.params;

        const product = await Product.findByIdAndDelete(productId)

        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found."
            })
        }

        res.status(200).json({
            success:true,
            message:"Product deleted."
        })


    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getAllProducts = async(req,res) =>{
    try{
        const products = await Product.find({})

        if(!products){
           return res.status(404).json({
                success:false,
                message:"Product not found."
            })
        }
        
        res.status(200).json({
            success:true,
            products
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


const getProductById = async(req,res) =>{
    try{

        const {productId} = req.params
        const product = await Product.findById(productId)

        if(!product){
           return res.status(404).json({
                success:false,
                message:"Product not found."
            })
        }
        
        res.status(200).json({
            success:true,
            product
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
    addProduct,
    deleteProduct,
    getAllProducts,
    getProductById
}