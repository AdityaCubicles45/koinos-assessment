import React, { useEffect, useState, useRef } from 'react';
import { useData } from '../state/DataContext';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

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
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900">Items</h1>
      <input
        type="text"
        placeholder="Search items by name or category..."
        value={searchQuery}
        onChange={handleSearch}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
        className={`w-full px-4 py-3 mb-6 text-base border-2 rounded-lg outline-none transition-colors ${
          searchFocused ? 'border-blue-500' : 'border-gray-300'
        }`}
        aria-label="Search items"
      />
      {loading && (
        <div className="flex items-center justify-center py-10 gap-3" role="status" aria-live="polite">
          <div className="h-5 w-3/5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[loading_1.5s_infinite] rounded"></div>
          <span>Loading items...</span>
        </div>
      )}
      {!loading && itemsLength === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p>No items found{searchQuery && ` matching "${searchQuery}"`}</p>
        </div>
      )}
      {!loading && itemsLength > 0 && (
        <>
          <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <Link
                        to={`/items/${item.id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        aria-label={`View details for ${item.name}`}
                      >
                        {item.name}
                      </Link>
                    </TableCell>
                    <TableCell>{item.category || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      ${item.price?.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) || '0.00'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-6 flex gap-3 items-center justify-center flex-wrap">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-5 py-2 text-sm font-medium border rounded-md transition-colors ${
                page === 1
                  ? 'opacity-50 cursor-not-allowed border-gray-300'
                  : 'border-gray-300 hover:bg-gray-50 hover:border-blue-500'
              }`}
              aria-label="Previous page"
              aria-disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 px-3" aria-live="polite">
              Page {page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page >= pagination.totalPages}
              className={`px-5 py-2 text-sm font-medium border rounded-md transition-colors ${
                page >= pagination.totalPages
                  ? 'opacity-50 cursor-not-allowed border-gray-300'
                  : 'border-gray-300 hover:bg-gray-50 hover:border-blue-500'
              }`}
              aria-label="Next page"
              aria-disabled={page >= pagination.totalPages}
            >
              Next
            </button>
            <span className="text-sm text-gray-600 px-3">Total: {pagination.total} items</span>
          </div>
        </>
      )}
      <style>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export default Items;