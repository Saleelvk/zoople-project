const asyncHandler = require("express-async-handler");
const Product = require("../models/product-model");
const { createCategory } = require("../utils/generate-categoriesId");
const Category = require("../models/category.model");
 
const getFileUrl = (req, file) => {
  return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
};

module.exports = {

  addProduct: asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      category: categoryName,
      stock,
      colors,

    } = req.body;

    // Handle file uploads (if any)
    const files = req.files || [];
    console.log("Uploaded files:", req.files);
    // Handle colors safely (either array or JSON string)

    let colorsArray;
    try {
      colorsArray = JSON.parse(colors);
    } catch (error) {
      colorsArray = Array.isArray(colors) ? colors : [];
    }
    
    // Handle image uploads
    const imageUrls = files.map((file) => getFileUrl(req, file)); // Use your function to generate URLs or file paths
    console.log("Image URLs:", imageUrls);

    // Create or find the category
    const category = await createCategory(categoryName);

    // Create the product
    try {
      const product = await Product.create({
          name,
          price,
          description,
          category: category._id,
          stock,
          colors: colorsArray,
          images: imageUrls,
        });
        res.status(201).json({
          message: "Product created successfully",
          product,
        });

        await Category.findByIdAndUpdate(category._id,{$push: { products: product._id }, });
      
      
  } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Error creating product', error });
  }
    console.log("Saved Product:", imageUrls);

    // Add product ID to the category

    // Send a success response
  }),

  
  getProductsById:asyncHandler(async(req,res)=>{
    const{id}=req.params;
    const product = await Product.findById(id)
    if(!product){
      res.status(400);
      throw new Error("product not found ")
    }
    res.json(product)

  }),


// Adjust the path as necessary

  getProducts :async (req, res) => {
    try {
      const products = await Product.find(); // Fetch products from the database
      res.json({ products }); // Return the products in JSON format
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  editProduct: asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Log incoming data
    console.log("Incoming data:", req.body);

    // Check if the product exists
    let product = await Product.findById(id);
    if (!product) {
        return res.status(400).json({ message: 'Product not found' });
    }

    // Update product details
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;

    // Handle colors
    if (req.body.colors) {
      // Assuming colors are sent as an array
      product.colors = Array.isArray(req.body.colors)
          ? req.body.colors // Use as-is if it's already an array
          : JSON.parse(req.body.colors); // Parse if it's a string (if you're using a string)
  }
  
  
    if (req.body.category) {
      try {
          let category = await createCategory(req.body.category); // Ensure the correct name is being passed
          product.category = category._id; // Set category ID correctly
      } catch (error) {
          console.error("Error creating category:", error);
          return res.status(400).json({ message: 'Error updating category', error });
      }
  } else {
      product.category = product.category; // Keep the existing category if not provided
  }
  

    // Handle removal of images
    if (req.body.existingImages) {
        const existingImages = Array.isArray(req.body.existingImages)
            ? req.body.existingImages
            : [req.body.existingImages];

        product.images = product.images.filter(image => !existingImages.includes(image));
    }

    // Handle new images if provided
    if (req.files && req.files.length > 0) {
        const newImages = req.files.map(file => getFileUrl(req, file));
        product.images = [...product.images, ...newImages];
    }

    try {
      const updatedProduct = await product.save();
      console.log("Updated Product:", updatedProduct); // Log the updated product
      res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: 'Error updating product', error });
  }
  
}),



// deleteProduct....

deleteProduct: asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(`Attempting to delete product with ID: ${id}`); 

  const product = await Product.findById(id);
  if (!product) {
    console.log('Product not found');
    return res.status(404).json({ message: "Product not found" });
  }

  // Check if the product has a valid category
  const categoryId = product.category && product.category._id ? product.category._id : product.category;
  if (categoryId) {
    // Remove the product ID from the category's product list
    await Category.findByIdAndUpdate(categoryId, {
      $pull: { products: product._id },
    });
  }

  // Delete the product
  await Product.findByIdAndDelete(id);

  // Send success response
  res.status(200).json({ message: "Product deleted successfully" });
}),


};

