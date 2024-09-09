import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const ProductDetails = ({ open, setOpen, product }) => {
  const { title, description, category, brand, price, salePrice, totalStock, image, rating = 4 } = product;

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: fullStars }, (_, index) => (
          <span key={index} className="text-yellow-500 text-lg">★</span>
        ))}
        {halfStar && <span className="text-yellow-500 text-lg">★</span>}
        {Array.from({ length: emptyStars }, (_, index) => (
          <span key={index + fullStars} className="text-gray-300 text-lg">☆</span>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-lg md:max-w-2xl lg:max-w-4xl h-[95vh] p-4 rounded-lg bg-white shadow-lg transition-all duration-300 my-1 pb-6">
        <DialogHeader>
          <DialogTitle className="text-[14px] pr-6 text-start sm:text-xl md:text-2xl font-bold text-gray-800">{title && title[0].toUpperCase() + title.slice(1)}</DialogTitle>
          <DialogDescription className="text-sm md:text-md font-medium text-gray-500 px-3 py-1 bg-gray-200 rounded-md w-max">{brand.toUpperCase()}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6 mt-0 sm:mt-4">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={image}
              alt={title}
              className="rounded-lg shadow-lg w-full max-w-[full] h-[170px] sm:h-64 md:h-80 lg:h-96 object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-2 sm:space-y-4">
            <div>
              <h4 className="text-[14px] sm:text-lg md:text-xl font-semibold text-gray-700">Description</h4>
              <p className="text-gray-600 text-[12px] sm:text-sm md:text-base leading-relaxed">{description}</p>
            </div>

            <div>
              <h4 className="text-[14px] sm:text-lg md:text-xl font-semibold text-gray-700">Category</h4>
              <p className="text-gray-600 text-[12px] sm:text-sm md:text-base leading-relaxed">{category}</p>
            </div>

            <div className="flex justify-between w-full sm:w-[80%]">
              <div>
                <h4 className="text-[14px] sm:text-lg md:text-xl font-semibold text-gray-700">Brand</h4>
                <p className="text-gray-600 text-[12px] sm:text-sm md:text-base leading-relaxed">{brand}</p>
              </div>

              <div>
                <h4 className="text-[14px] sm:text-lg md:text-xl font-semibold text-gray-700">Price</h4>
                <p className="text-gray-800">
                  <span className="line-through text-red-500 mr-5">₹{price}</span>
                  <span className="text-green-600 font-bold">₹{salePrice}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-between w-full sm:w-[80%]">
              <div>
                <h4 className="text-[14px] sm:text-lg md:text-xl font-semibold text-gray-700">Stock</h4>
                <p className={`text-sm md:text-base ${totalStock === 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}`}>
                  {totalStock === 0 ? 'Out of stock' : `${totalStock} available`}
                </p>
              </div>

              <div>
                <h4 className="text-[14px] sm:text-lg md:text-xl font-semibold text-gray-700">Rating</h4>
                {renderStars(rating)}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
