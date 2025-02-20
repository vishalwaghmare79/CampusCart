import React, { useRef } from "react";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategorySlider = ({ categories }) => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 300; 
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative p-4">
      {/* Prev Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md z-10"
        onClick={() => scroll("left")}
      >
        <ChevronLeft size={24} />
      </button>

      {/* Scrollable Slider */}
      <div
        ref={sliderRef}
        className="flex space-x-4 overflow-x-scroll scroll-smooth no-scrollbar"
      >
        {categories.map((category) => (
          <motion.div key={category._id} className="min-w-[300px]">
            <CategoryCard category={category} />
          </motion.div>
        ))}
      </div>

      {/* Next Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md z-10"
        onClick={() => scroll("right")}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default CategorySlider;
