import React, { useEffect, useId, useState } from "react";
import ProductFilter from "./ProductFilter";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductItems from "./ShoppingProductItems";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import {
  fetchProductDetails,
  fetchShoppingProducts,
} from "@/ReduxToolkit/slices/shopSlice";
import {
  createSearchParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import ProductDetails from "./ProductDetails";
import { addToCart, fetchCartItems } from "@/ReduxToolkit/slices/cartSlice";
import { toast } from "@/hooks/use-toast";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

const ProductList = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const location = useLocation();
  const [sort, setSort] = useState("price-lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { productList, isLoading, error, productDetails } = useSelector(
    (state) => state.shoppingProduct
  );

  const handleAddtoCart = (userId, productId, quantity, stock) => {
    dispatch(addToCart({ userId, productId, quantity })).then(() => {
      toast({ title: "Product Added Successfully" });
    });
  };

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchShoppingProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);

  // Handles description truncation logic
  const descriptionFunction = (description, maxLength, dots) => {
    if (!description) return "";

    if (description.length <= maxLength) {
      return (
        description.charAt(0).toUpperCase() + description.slice(1).toLowerCase()
      );
    }

    return (
      description.charAt(0).toUpperCase() +
      description.slice(1, maxLength).toLowerCase() +
      dots
    );
  };

  // Handle sort functionality
  function handleSort(value) {
    setSort(value);
  }

  // Handle filter functionality
  function handleFilter(getSectionId, getCurrentOption) {
    let copyFilters = { ...filters };

    if (!copyFilters[getSectionId]) {
      copyFilters[getSectionId] = [getCurrentOption];
    } else {
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1) {
        copyFilters[getSectionId].push(getCurrentOption);
      } else {
        copyFilters[getSectionId] = copyFilters[getSectionId].filter(
          (option) => option !== getCurrentOption
        );
      }
    }

    if (copyFilters[getSectionId].length === 0) {
      delete copyFilters[getSectionId];
    }

    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  }

  // Load filters from sessionStorage on mount
  useEffect(() => {
    try {
      const storedFilters = JSON.parse(sessionStorage.getItem("filters")) || {};
      setFilters(storedFilters);
    } catch (error) {
      console.error("Failed to parse filters from sessionStorage", error);
    }
  }, []); // This effect runs once after the component mounts

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails({ id: getCurrentProductId })).then(() =>
      setOpenDetailsDialog(true)
    ); // Open dialog only after fetching details
  };

  // Loading state
  if (isLoading) {
    return <div className="p-4 text-center">Loading products...</div>;
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:space-x-6 p-4">
        {/* Filter Sidebar */}
        <div className="w-full md:w-1/4 mb-4 md:mb-0 pt-[60px]">
          <ProductFilter filters={filters} handleFilter={handleFilter} />
        </div>

        {/* Product List Section */}
        <div className="w-full bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-[16px] sm:text-xl font-semibold">All Products</h2>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="text-muted-foreground text-[12px]">
                {productList.length} Products
              </span>

              {/* Sorting Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[200px] z-40 bg-white p-2 rounded-md shadow-lg"
                >
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={handleSort}
                  >
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        className="text-[14px] py-1 px-3 hover:bg-slate-100 rounded-md cursor-pointer"
                        key={sortItem.id}
                        value={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {productList && productList.length > 0 ? (
              productList.map((productItem) => (
                <ShoppingProductItems
                  key={productItem._id}
                  descriptionFunction={descriptionFunction}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                  handleGetProductDetails={handleGetProductDetails}
                />
              ))
            ) : (
              <div className="col-span-full text-center">
                No products available
              </div>
            )}
          </div>
        </div>
      </div>

     <div>
     {productDetails && (
        <ProductDetails
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          product={productDetails}
        />
      )}
     </div>
    </>
  );
};

export default ProductList;
