import React, { createContext, useCallback, useContext, useState } from 'react';
import API_BASE_URL from '../config';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.q) queryParams.append('q', params.q);
      
      const res = await fetch(`${API_BASE_URL}/api/items?${queryParams}`);
      if (!res.ok) throw new Error('Failed to fetch items');
      const json = await res.json();
      return json;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DataContext.Provider value={{ items, setItems, fetchItems, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);