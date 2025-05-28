import React from 'react'
import { useState } from 'react';

function FilterBar({ onFilterChange }) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleFilter = () => {
    onFilterChange({ keyword, location });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        placeholder="Search by keyword..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        type="text"
        placeholder="Filter by location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        onClick={handleFilter}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Filter
      </button>
    </div>
  );
}

export default FilterBar;