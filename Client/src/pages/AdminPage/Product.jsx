import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { addProductFormElements } from "@/config";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  fetchAllProducts,
  updateProducts,
} from "@/ReduxToolkit/slices/productSlice";
import { toast } from "@/hooks/use-toast";
import ProductList from "./ProductList";

const Product = () => {
  const [modifyData, setModifyData] = useState(false);
  const [paramsIndex, setParamsIndex] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const { isLoading, error } = useSelector((state) => state.adminProduct);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
   
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (paramsIndex !== null) {
      dispatch(updateProducts({ id: paramsIndex, formData: formData })).then(
        (data) => {
          if (data?.payload?.success) {
            setOpen(false);
            toast({ title: data?.payload?.message });
            setParamsIndex(null);
            dispatch(fetchAllProducts());
          } else {
            toast({
              title: data?.payload?.message || "Error while adding product",
              variant: "destructive",
            });
          }
        }
      );
    } else {
      dispatch(addNewProduct(formData)).then((data) => {
        if (data?.payload?.success) {
          setOpen(false);
          toast({ title: data?.payload?.message });
          dispatch(fetchAllProducts());
        } else {
          toast({
            title: data?.payload?.message || "Error while adding product",
            variant: "destructive",
          });
        }
      });
    }
  };

  const renderFormField = (element) => {
    const { componentType, name, label, placeholder, type, options } = element;

    switch (componentType) {
      case "input":
        return (
          <div className="mb-2" key={name}>
            <label className="text-sm font-medium" htmlFor={name}>
              {label}
            </label>
            {type === "file" &&
              formData[name] &&
              typeof formData[name] === "string" && (
                <div className="mb-2">
                  <img
                    src={formData[name]}
                    alt="Product Preview"
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}
            <input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              {...(type === "file"
                ? { accept: "image/*" }
                : { value: formData[name] })}
            />
          </div>
        );
      case "textarea":
        return (
          <div className="mb-2" key={name}>
            <label className="text-sm font-medium" htmlFor={name}>
              {label}
            </label>
            <textarea
              id={name}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              rows={4}
            />
          </div>
        );
      case "select":
        return (
          <div className="mb-2" key={name}>
            <label className="text-sm font-medium" htmlFor={name}>
              {label}
            </label>
            <select
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select {label}</option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          {" "}
          <h1 className="text-2xl font-bold mb-4">Product List</h1>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            {paramsIndex !== null ? (
              <Button className="bg-gradient-to-b  from-green-700 via-green to-green-900 text-white">
                Update Product
              </Button>
            ) : (
              <Button className="bg-gradient-to-b  from-gray-700 via-black to-gray-700 text-white">
                Add New Product
              </Button>
            )}
          </SheetTrigger>
          <SheetContent size="lg" className="overflow-y-auto max-h-screen">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
              <SheetDescription>
                Fill in the details of the new product below
              </SheetDescription>
            </SheetHeader>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 text-[12px] mt-3"
            >
              {addProductFormElements.map(renderFormField)}

              <div className="col-span-full">
                <Button
                  type="submit"
                  className="bg-gradient-to-b from-gray-700 via-black to-gray-700 text-white"
                  disabled={isLoading}
                >
                  {paramsIndex !== null ? (
                    <div> {isLoading ? "Updating..." : "Update"}</div>
                  ) : (
                    <div>{isLoading ? "Submitting..." : "Submit"}</div>
                  )}
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <ProductList
          modifyData={modifyData}
          setModifyData={setModifyData}
          paramsIndex={paramsIndex}
          setParamsIndex={setParamsIndex}
          setOpen={setOpen}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default Product;
