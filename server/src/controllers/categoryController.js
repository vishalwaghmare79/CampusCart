const { Category } = require("../models/categorySchema.Model");
const slugify = require('slugify');

// Controller for creating a new category
const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(401).send({ message: 'Name is required' });
        }

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category Already Exists'
            });
        }

        const category = await new Category({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: `New ${name} category created`,
            category
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating category',
            error
        });
    }
};

// Controller for updating an existing category by ID
const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const category = await Category.findByIdAndUpdate(id, 
            { name, slug: slugify(name) }, 
            { new: true }
        );
        
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found",
            });
        }


        res.status(200).send({
            success: true,
            message: "Category updated successfully.",
            category,
        });

    } catch (error) {
        console.error("Error while updating category:", error);
        res.status(500).send({
            success: false,
            message: "An error occurred while updating the category. Please try again later.",
            error
        });
    }
};

// Controller for retrieving all categories
const categoryController = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).send({
            success: true,
            message: "All categories retrieved successfully.",
            categories,
        });
        
    } catch (error) {
        console.error("Error while fetching categories:", error);
        res.status(500).send({
            success: false,
            message: "An error occurred while retrieving categories. Please try again later.",
            error,
        });
    }
};

// Controller for retrieving a single category by slug
const singleCategoryController = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });

        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category not found.',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Category retrieved successfully.',
            category,
        });

    } catch (error) {
        console.error("Error while retrieving single category:", error);
        res.status(500).send({
            success: false,
            message: "An error occurred while retrieving the category. Please try again later.",
            error,
        });
    }
};

// Controller for deleting a category by ID

const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found.",
            });
        }

        res.status(200).send({
            success: true,
            message: `${category.name} deleted successfully.`,
        });

    } catch (error) {
        console.error("Error while deleting category:", error);
        res.status(500).send({
            success: false,
            message: "An error occurred while deleting the category. Please try again later.",
            error,
        });
    }
};

module.exports = { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController };
