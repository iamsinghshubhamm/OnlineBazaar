import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

const UserCartWrapper = ({
  cartItems,
  user,
  deleteProductHandler,
  updateProductHanlder,
}) => {
  return (
    <div className="mt-8 space-y-4  ">
        <div className="max-h-[400px] h-full  overflow-y-scroll overflow-x-hidden">
      {cartItems.items && cartItems.items.length > 0 ? (
        cartItems.items.map((item, index) => (
       
           <div
            key={index}
            className="flex justify-between items-center border-b pb-4"
          >
            <div className="flex gap-4 items-center w-[60%] ">
              <div className="w-10 h-10 sm:w-15 sm:h-15 md:w-20 md:h-20 rounded-md border">
                <img
                  src={item.productId?.image}
                  alt={item.productId?.title || "Product Image"}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <div>
                <h3 className="text-[13px]   font-semibold sm:text-[14px] md:text-[16px]">
                  {item.productId?.title[0].toUpperCase() + item.productId?.title?.slice(1).substring(0, 10)}
                </h3>
                <p className="text-sm text-[12px] sm:text-[13px] md:text-[15px] text-gray-500">{item.productId?.brand[0].toUpperCase() + item.productId?.brand.slice(1) }</p>
                <p className="text-sm text-gray-600">
                  ₹{(item.productId?.salePrice ?? 0).toFixed(2)}{" "}
                </p>
              </div>
            </div>

            <div className="flex flex-col w-[40%] items-end pr-4">
              <div className="flex items-center gap-2 select-none">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={item.quantity === 1}
                  onClick={() =>
                    updateProductHanlder(user.id, item.productId?._id, -1)
                  }
                  className="px-2 py-1 w-6 text-xl h-6"
                >
                  -
                </Button>
                <span className="font-medium text-[12px] sm:text-[15px]">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={item.quantity >= 5}
                  onClick={() =>
                    updateProductHanlder(user.id, item.productId?._id, 1)
                  }
                  className="px-2 py-1 w-6 text-sm h-6 "
                >
                  +
                </Button>
              </div>

              <p className="text-gray-600 mt-2 text-[12px] sm:text-sm">
                Total: ₹
                {((item.productId?.salePrice ?? 0) * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() =>
                  deleteProductHandler(user.id, item.productId?._id)
                }
              >
                <Trash2Icon
                  width={20}
                  className="relative left-0 text-red-500 hover:text-red-700 hover:font-extrabold hover:scale-y-125 cursor-pointer transition-all duration-300"
                />
              </button>
            </div>
          </div>
        ))

      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
        </div>


      {/* Total amount */}
      <div className="mt-5 space-y-3">
        <div className="flex justify-between font-semibold text-sm sm:text-[16px] md:text-lg">
          <span>Total amount</span>
          <span>₹{(cartItems.totalPrice ?? 0).toFixed(2)}</span>{" "}
        </div>
      </div>
    </div>
  );
};

export default UserCartWrapper;
