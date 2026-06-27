'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/properties`
        );
        setProperties(response.data);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-4">Find Your Dream Property</h1>
        <p className="text-xl">Browse thousands of listings from trusted real estate agents</p>
      </section>

      <h2 className="text-3xl font-bold mb-6">Featured Properties</h2>

      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading properties...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!loading && properties.length === 0 && (
        <p className="text-gray-600 text-lg">No properties available yet.</p>
      )}

      {!loading && properties.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property: any) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-48 flex items-center justify-center">
                <span className="text-gray-400 text-lg">No Image</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{property.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{property.address}</p>
                <div className="flex justify-between items-center">
                  <p className="text-blue-600 font-bold text-lg">
                    ${property.price?.toLocaleString()}
                  </p>
                  <span className="text-gray-500 text-sm">
                    {property.bedrooms}🛏️ {property.bathrooms}🚿
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
