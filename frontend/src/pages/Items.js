import React, { useEffect, useState, useRef } from 'react';
import { useData } from '../state/DataContext';
import ItemCard from '../components/ui/item-card';

const styles = {
  container: {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: 'calc(100vh - 80px)'
  },
  header: {
    fontSize: '32px',
    fontWeight: '600',
    marginBottom: '24px',
    color: '#1a1a1a'
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '24px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    transition: 'border-color 0.2s',
    outline: 'none'
  },
  searchInputFocus: {
    borderColor: '#007bff'
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    gap: '12px'
  },
  skeleton: {
    height: '20px',
    width: '60%',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'loading 1.5s infinite',
    borderRadius: '4px'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '24px'
  },
  pagination: {
    marginTop: '24px',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  buttonHover: {
    backgroundColor: '#f8f9fa',
    borderColor: '#007bff'
  },
  info: {
    fontSize: '14px',
    color: '#666',
    padding: '0 12px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#999'
  }
};

function Items() {
  const { fetchItems, setItems, loading } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0, items: [] });
  const [searchFocused, setSearchFocused] = useState(false);
  const abortControllerRef = useRef(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const loadItems = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      let isMounted = true;

      try {
        const data = await fetchItems({ page, limit: 50, q: searchQuery || undefined });
        if (isMounted && data) {
          setItems(data.items || []);
          setPagination({
            total: data.total || 0,
            totalPages: data.totalPages || 0,
            items: data.items || []
          });
        }
      } catch (err) {
        if (err.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch items:', err);
          setPagination({
            total: 0,
            totalPages: 0,
            items: []
          });
        }
      }
    };

    const delay = searchQuery ? 300 : 0;
    debounceTimerRef.current = setTimeout(loadItems, delay);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page, searchQuery, fetchItems, setItems]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const items = pagination?.items || [];
  const itemsLength = items.length;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Items</h1>
      <input
        type="text"
        placeholder="Search items by name or category..."
        value={searchQuery}
        onChange={handleSearch}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
        style={{
          ...styles.searchInput,
          ...(searchFocused ? styles.searchInputFocus : {})
        }}
        aria-label="Search items"
      />
      {loading && (
        <div style={styles.loadingContainer} role="status" aria-live="polite">
          <div style={styles.skeleton}></div>
          <span>Loading items...</span>
        </div>
      )}
      {!loading && itemsLength === 0 && (
        <div style={styles.emptyState}>
          <p>No items found{searchQuery && ` matching "${searchQuery}"`}</p>
        </div>
      )}
      {!loading && itemsLength > 0 && (
        <>
          <div style={styles.gridContainer} role="list">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
          <div style={styles.pagination}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                ...styles.button,
                ...(page === 1 ? styles.buttonDisabled : {})
              }}
              aria-label="Previous page"
              aria-disabled={page === 1}
            >
              Previous
            </button>
            <span style={styles.info} aria-live="polite">
              Page {page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
              disabled={page >= pagination.totalPages}
              style={{
                ...styles.button,
                ...(page >= pagination.totalPages ? styles.buttonDisabled : {})
              }}
              aria-label="Next page"
              aria-disabled={page >= pagination.totalPages}
            >
              Next
            </button>
            <span style={styles.info}>Total: {pagination.total} items</span>
          </div>
        </>
      )}
      <style>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        a:hover { color: #0056b3; }
        button:not(:disabled):hover { background-color: #f8f9fa; border-color: #007bff; }
      `}</style>
    </div>
  );
}

export default Items;