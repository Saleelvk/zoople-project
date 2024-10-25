const Category = require('../models/category.model');
const asyncHandler = require('express-async-handler');
 
// Function to create a new category
const createCategory = asyncHandler(async (name) => {
    // Log the name to see what is being passed
    console.log("Creating category with name:", name);

    let category = await Category.findOne({ name: name.trim() }); // Use trim() to remove extra whitespace

    if (category) {
        console.log("Category found:", category); // Log found category
        return category; // Return existing category
    }

    const newCategory = new Category({ name });
    await newCategory.save();

    console.log("New category created:", newCategory); // Log new category
    return newCategory;
});


module.exports = {
    createCategory,
};
