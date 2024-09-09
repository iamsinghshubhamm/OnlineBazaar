import { filterOptions } from '@/config';
import React, { Fragment } from 'react';

const ProductFilter = ({ filters, handleFilter }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm w-full max-w-[300px]">
      <div className="p-4 border-b bg-gray-200 rounded-t-md">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="p-4 space-y-3 bg-gray-50">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              {/* Filter Title */}
              <h3 className="text-md font-semibold mb-3 capitalize">{keyItem}</h3>

              <div className="space-y-1">
                {filterOptions[keyItem].map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={option.id}
                      name={option.id}
                      checked={filters && Object.keys(filters).length > 0 && filters[keyItem] && filters[keyItem].indexOf(option.id) > -1}
                      onChange={() => handleFilter(keyItem, option.id)} 
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out cursor-pointer"
                    />
                    <label htmlFor={option.id} className="text-gray-700 cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </Fragment>
        ))}

        <div className="pt-1">
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-150">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
