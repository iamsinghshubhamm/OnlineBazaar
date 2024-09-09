const Product = require("../../Model/productModel");
const Cloudinary = require("cloudinary").v2;
const { uploadImageToCloudinary } = require("../../utils/imageUploader");
const mongoose = require('mongoose');


exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const image = req.files?.image

    if (
      !title ||
      !description ||
      !category ||
      !brand ||
      !price ||
      !salePrice ||
      !totalStock
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let productImageUrl =
      "https://via.placeholder.com/150?text=No+Image+Available";
    let productImageId = null;

    if (image) {
      const uploadedImage = await uploadImageToCloudinary(
        image,
        process.env.FOLDER_NAME,
        500,
        "auto"
      );
      productImageUrl = uploadedImage.secure_url;
      productImageId = uploadedImage.public_id;
    }

    const createNewProduct = await Product.create({
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      image: productImageUrl,
      imagePublicId: productImageId,
    });

    return res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: createNewProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params || req.body;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Product ID is required",
    });
  }

  try {
    const findProduct = await Product.findById(id);

    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (findProduct.imagePublicId) {
      await Cloudinary.uploader.destroy(findProduct.imagePublicId);
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, brand, price, salePrice, totalStock } = req.body;
  const image = req.files?.image;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (image) {
      if (product.imagePublicId) {
        await Cloudinary.uploader.destroy(product.imagePublicId);
      }

      const uploadImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME, 500, "auto");
      product.image = uploadImage.secure_url;
      product.imagePublicId = uploadImage.public_id;
    }

    const updateFields = { title, description, category, brand, price, salePrice, totalStock };

    // Update the product fields
    Object.keys(updateFields).forEach((field) => {
      if (updateFields[field] !== undefined) {
        product[field] = updateFields[field];
      }
    });

    // Save the updated product
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



exports.getAllProducts = async (req, res) => {
  try {
    const getProducts = await Product.find({});

    if (getProducts.length < 1) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched all products",
      data: getProducts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);

    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "No product found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: findProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
