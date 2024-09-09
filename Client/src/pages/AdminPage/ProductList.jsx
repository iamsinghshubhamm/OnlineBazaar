import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  deleteProducts,
  fetchAllProducts,
} from "@/ReduxToolkit/slices/productSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductList = ({
  modifyData,
  setModifyData,
  setOpen,
  setParamsIndex,
  setFormData,
}) => {
  const dispatch = useDispatch();
  const { productList, isLoading, error } = useSelector(
    (state) => state.adminProduct
  );

  const [deletingProductId, setDeletingProductId] = useState(null); 
  
  const descriptionFunction = (description, maxLength, dots) => {
    if (!description) return "";

    if (description.length <= maxLength) {
      return description.charAt(0).toUpperCase() + description.slice(1);
    }

    return (
      description.charAt(0).toUpperCase() +
      description.slice(1, maxLength) +
      dots
    );
  };

  const updateHandler = (id, product) => {
    console.log("id--- ", id);
    setParamsIndex(id);
    setOpen(true);
    setFormData({
      title: product.title,
      description: product.description,
      category: product.category,
      brand: product.brand,
      price: product.price,
      salePrice: product.salePrice,
      totalStock: product.totalStock,
      image: product.image,
    });
  };

  const deletehandler = (productId) => {
    setDeletingProductId(productId); 

    dispatch(deleteProducts({ id: productId }))
      .then((data) => {
        toast({ title: "Product deleted successfully" });
        dispatch(fetchAllProducts());
      })
      .catch((error) => {
        toast({ title: "Failed to delete product", variant: "destructive" });
      })
      .finally(() => {
        setDeletingProductId(null); 
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <div className="container mx-auto p-2">
      <div className="flex justify-end mb-4">
        <Button
          className={`${
            modifyData ? "bg-blue-600" : "bg-green-600"
          }  w-max flex justify-end- mr-0`}
          onClick={() => setModifyData(!modifyData)}
        >
          Modification
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {productList.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg flex flex-col justify-between p-4 h-full"
          >
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1 text-[16px]">
                  {descriptionFunction(product.title, 25, ".")}
                </h2>
                <p className="text-gray-600 mb-1 text-[14px]">
                  {descriptionFunction(product.description, 170, "...")}
                </p>
                <p className="text-gray-800 mb-1 text-[14px] font-semibold">
                  Price: ${product.salePrice || product.price}
                </p>
                <p className="text-sm text-gray-500">
                  Stock: {product.totalStock}
                </p>
              </div>
            </div>

            {modifyData && (
              <div className="mt-auto flex justify-between items-center pt-4">
                <button
                  onClick={() => updateHandler(product._id, product)}
                  className="bg-gray-200 px-7 py-2 rounded-md text-[14px] text-gray-800 hover:bg-gray-300"
                >
                  Update
                </button>
                <button
                  onClick={() => deletehandler(product._id)}
                  className="bg-red-200 px-7 py-2 rounded-md text-[14px] text-red-800 hover:bg-red-300"
                  disabled={deletingProductId === product._id} 
                >
                  {deletingProductId === product._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
