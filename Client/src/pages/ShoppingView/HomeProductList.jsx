import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Sleeve Linen Shirt ',
    color: 'Blue',
    path: '/shopping/product-list',
    price: '2899',
    imageSrc: 'https://res.cloudinary.com/divv5pbuv/image/upload/v1725816108/OnlineBazaar/yzeg6a1ktowezhip0pm5.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
  {
    id: 2,
    name: 'Doodle Unicorn Dress for',
    color: 'Yellow',
    path: '/shopping/product-list',
    price: '2500',
    imageSrc: 'https://res.cloudinary.com/divv5pbuv/image/upload/v1725816576/OnlineBazaar/hirj1acub65blxqwvnrv.jpg',
    imageAlt: 'Black canvas tote bag with leather straps.',
  },
  {
    id: 3,
    name: 'Cotton Classic Kurta',
    color: 'Yello',
    path: '/shopping/product-list',
    price: '1799',
    imageSrc: 'https://m.media-amazon.com/images/I/511T24g6YIL._SX679_.jpg',
    imageAlt: 'Gray wool hat for outdoor adventures.',
  },
  {
    id: 4,
    name: 'Trendmall lehenga',
    color: 'Yellow',
    path: '/shopping/product-list',
    price: '2777',
    imageSrc: 'https://res.cloudinary.com/divv5pbuv/image/upload/v1725816425/OnlineBazaar/hbc5fbslmjpub9ghjeqe.jpg',
    imageAlt: 'White linen shirt for men.',
  },
];

export default function HomeProductList() {
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  return (
    <div className="bg-white mt-2 sm:mt-6 md:mt-8">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        
        {/* Header and CTA */}
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Trending products</h2>
          <Link to="/shopping/product-list" className="hidden text-sm font-medium text-gray-600 hover:text-gray-500 md:block">
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:gap-x-6 sm:grid-cols-2 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products.map((product) => (
            <Link to={product.path} key={product.id} className="group relative">
              
              {/* Product Image */}
              <div className="h-56 w-full overflow-hidden bg-top rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              
              {/* Product Details */}
              <h3 className="mt-4 text-sm text-gray-700">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              <p className="mt-1 text-sm font-medium text-gray-900">₹{product.price}</p>
            </Link>
          ))}
        </div>

        {/* CTA for Small Screens */}
        <div className="mt-4 text-sm md:hidden">
          <div onClick={() => navigate('/shopping/product-list')} className="font-medium text-gray-600 hover:text-gray-500 cursor-pointer">
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
