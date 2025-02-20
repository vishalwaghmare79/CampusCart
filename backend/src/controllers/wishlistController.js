import { Wishlist } from "../models/wishlistSchema.Model.js";

export const addWishlistController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        const existingItem = await Wishlist.findOne({ userId, productId });
        if (existingItem) {
            return res.status(400).send({
                success: false,
                message: 'Product is already in wishlist',
            });
        }

        const newWishlistItem = new Wishlist({ userId, productId });
        await newWishlistItem.save();
        
        res.status(201).send({
            success: true,
            message: 'Product added to wishlist',
            newWishlistItem, 
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while adding product to wishlist",
            error,
        });
    }
};

export const removeWishlistController = async (req, res) => {
    console.log("wishlist is ", req.params);
    
    try {
      const { id } = req.params; 
      const item = await Wishlist.findByIdAndDelete(id);
      console.log("deleted item", item);
      
  
      res.status(200).send({
        success: true,
        message: 'Product removed from wishlist',
        removedItem: item,
      });
    } catch (error) {
      console.error("Error while removing item from wishlist:", error);
      res.status(500).send({
        success: false,
        message: 'Error while removing item from wishlist',
        error,
      });
    }
};
  
export const getWishlistController = async (req, res) => {
    try {
        const userId = req.user._id;
        const wishlistItems = await Wishlist.find({ userId }).populate('productId');
        res.status(200).send({
            success: true,
            wishlistItems,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching wishlist items",
            error,
        });
    }
};

