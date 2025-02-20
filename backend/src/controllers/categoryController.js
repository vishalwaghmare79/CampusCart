import slugify from "slugify";
import { Category } from "../models/categorySchema.Model.js";
import cloudinary from "../config/cloudinary.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;

    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }

    const image = {
      url: file.path,
      publicId: file.filename,
    };

    const category = await new Category({
      name,
      image,
    }).save();

    res.status(201).send({
      success: true,
      message: `New ${name} category created`,
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in creating category",
      error,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const file = req.file;    

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    let updatedImage = category.image;
    if (file) {
      updatedImage = { url: file.path, publicId: file.filename };
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { 
        name, 
        image: updatedImage 
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category updated successfully.",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error while updating category:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while updating the category. Please try again later.",
      error: error.message,
    });
  }
};

export const getCategoryController = async (req, res) => {
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
      message:
        "An error occurred while retrieving categories. Please try again later.",
      error,
    });
  }
};

export const getSingleCategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category retrieved successfully.",
      category,
    });
  } catch (error) {
    console.error("Error while retrieving single category:", error);
    res.status(500).send({
      success: false,
      message:
        "An error occurred while retrieving the category. Please try again later.",
      error,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
    try {
      const { id } = req.params;
  
      const category = await Category.findById(id);
  
      if (!category) {
        return res.status(404).send({
          success: false,
          message: "Category not found.",
        });
      }
  
      if (category.image && category.image.publicId) {
        await cloudinary.uploader.destroy(category.image.publicId);
      }
  
      await Category.findByIdAndDelete(id);
  
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