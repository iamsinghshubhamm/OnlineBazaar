const Product = require('../../Model/productModel');

exports.getFilteredProducts = async (req, res) => {
  try {
    const { category = '', brand = '', sortBy = 'price-lowtohigh' } = req.query;

    let filters = {};

    // Filter by category if provided
    if (category) {
      filters.category = { $in: category.split(',') }; 
    }

    if (brand) {
      filters.brand = { $in: brand.split(',') }; 
    }

    let sortOptions = {};
    if (sortBy === 'price-lowtohigh') {
      sortOptions.price = 1; // Ascending
    } else if (sortBy === 'price-hightolow') {
      sortOptions.price = -1; // Descending
    } else if (sortBy === 'name-atoz') {
      sortOptions.name = 1; // Alphabetical A-Z
    } else if (sortBy === 'name-ztoa') {
      sortOptions.name = -1; // Alphabetical Z-A
    }

    // Fetch products with filters and sorting applied
    const products = await Product.find(filters).sort(sortOptions);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Some error occurred',
    });
  }
};



exports.getProductDetails = async (req, res) => {
  try {
    const { id } = req.params; 

    // Find the product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching product details',
    });
  }
};
