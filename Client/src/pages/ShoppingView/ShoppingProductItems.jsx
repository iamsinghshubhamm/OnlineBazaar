import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ShoppingProductItems = ({
  product,
  descriptionFunction,
  handleGetProductDetails,
  handleAddtoCart,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cartItem);

  const [uniqueProductIds, setUniqueProductIds] = useState([]);

  const getUniqueProductIds = () => {
    const uniqueIds = new Set(); 

    if (cart?.items?.length > 0) {
      cart.items.forEach((item) => {
        uniqueIds.add(item.productId._id); 
      });
    }
    return [...uniqueIds];
  };

  useEffect(() => {
    const uniqueIds = getUniqueProductIds();
    setUniqueProductIds(uniqueIds); 
  }, [cart]); 

  const isProductInCart = uniqueProductIds.includes(product._id);

  return (
    <div className="relative bg-white shadow-md rounded-lg flex flex-col justify-between p-4 h-full transform transition duration-300 hover:shadow-xl hover:scale-105 hover:translate-y-1">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="relative cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover rounded-t-lg hover:scale-105 hover:translate-y-1 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold mb-1 text-[16px]">
          {descriptionFunction(product.title, 25, ".")}
        </h2>
        <p className="text-gray-600 mb-1 text-[14px]">
          {descriptionFunction(product.description, 170, "...")}
        </p>

        <div className="flex gap-4 justify-between items-center">
          <p className="mb-1 text-[12px] text-gray-500 font-semibold line-through">
            ₹{product.price}
          </p>
          <p className="mb-1 text-[13px] text-gray-500 font-semibold bg-gray-100 rounded-md px-3 py-1">
            {product.brand[0].toUpperCase() + product.brand.slice(1)}
          </p>
        </div>

        <p className="text-gray-800 mb-3 text-[14px] font-semibold">
          Price: ₹{product.salePrice}
        </p>

        <div className="absolute bottom-4 right-4">
          {product?.totalStock === 0 ? (
            <Button className="opacity-60 cursor-not-allowed bg-red-400 hover:bg-red-400">Out Of Stock</Button>
          ) : isProductInCart ? (
            <Button className="opacity-60 cursor-not-allowed select-none">
              Added
            </Button>
          ) : (
            <Button
              onClick={() =>
                handleAddtoCart(user.id, product?._id, 1, product?.totalStock)
              }
              className="transition duration-300 transform hover:scale-105"
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingProductItems;
