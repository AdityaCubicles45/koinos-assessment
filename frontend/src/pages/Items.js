import React, { useEffect, useState, useRef } from 'react';
import { useData } from '../state/DataContext';
import { Link } from 'react-router-dom';

function Items() {
  const { fetchItems, setItems, loading } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0, items: [] });
  const abortControllerRef = useRef(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    let isMounted = true;

    const loadItems = async () => {
      try {
        const data = await fetchItems({ page, limit: 20, q: searchQuery || undefined });
        if (isMounted) {
          setItems(data.items);
          setPagination({
            total: data.total,
            totalPages: data.totalPages,
            items: data.items
          });
        }
      } catch (err) {
        if (err.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch items:', err);
        }
      }
    };

    loadItems();

    return () => {
      isMounted = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page, searchQuery, fetchItems, setItems]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Items</h1>
      <input
        type="text"
        placeholder="Search items..."
        value={searchQuery}
        onChange={handleSearch}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          fontSize: '16px',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}
        aria-label="Search items"
      />
      {loading && <p>Loading...</p>}
      {!loading && pagination.items.length === 0 && <p>No items found</p>}
      {!loading && pagination.items.length > 0 && (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {pagination.items.map(item => (
              <li key={item.id} style={{ marginBottom: '10px' }}>
                <Link 
                  to={`/items/${item.id}`}
                  style={{ textDecoration: 'none', color: '#007bff' }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{ padding: '8px 16px' }}
            >
              Previous
            </button>
            <span>Page {page} of {pagination.totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
              disabled={page >= pagination.totalPages}
              style={{ padding: '8px 16px' }}
            >
              Next
            </button>
            <span style={{ marginLeft: '20px' }}>Total: {pagination.total}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Items;