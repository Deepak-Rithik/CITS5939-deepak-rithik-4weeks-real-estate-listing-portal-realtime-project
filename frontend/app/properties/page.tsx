'use client';

import { useState } from 'react';

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Search Properties</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg text-center">
        <p className="text-gray-600">Search results will appear here</p>
      </div>
    </div>
  );
}
