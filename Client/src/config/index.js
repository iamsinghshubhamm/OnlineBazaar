import {
  FaTachometerAlt,
  FaShoppingCart,
  FaList,
  FaPlus,
  FaMoneyBill,
} from "react-icons/fa";

export const sidebarItems = [
  {
    path: "dashboard",
    label: "Dashboard",
    icon: FaTachometerAlt,
  },
  {
    path: "orders",
    label: "Order Page",
    icon: FaShoppingCart,
  },
  {
    path: "products",
    label: "Product List",
    icon: FaList,
  },
  {
    path: "create-product",
    label: "Create Project",
    icon: FaPlus,
  },
  {
    path: "checkout",
    label: "Checkout",
    icon: FaMoneyBill,
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
  {
    label: "Product Image",
    name: "image",
    componentType: "input",
    type: "file", // File input for image
    placeholder: "Upload product image",
  },
];

export const shoppingHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shopping/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shopping/product-list",
  },
  {
    id: "women",
    label: "Women",
    path: "/shopping/product-list",
  },
  {
    id: "watch",
    label: "Watch",
    path: "/shopping/product-list",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shopping/product-list",
  },
  {
    id: "footwear",
    label: "Footwears",
    path: "/shopping/product-list",
  },
];

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];
