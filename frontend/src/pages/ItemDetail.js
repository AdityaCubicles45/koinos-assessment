import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../components/ui/product-detail';
import API_BASE_URL from '../config';

const loadingStyles = {
  container: {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#6b7280',
    fontSize: '18px'
  }
};

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/items/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Item not found');
        return res.json();
      })
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(() => {
        navigate('/');
      });
  }, [id, navigate]);

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div style={loadingStyles.container}>
        <div style={loadingStyles.loading} role="status" aria-live="polite">
          Loading item details...
        </div>
      </div>
    );
  }

  if (!item) return null;

  return <ProductDetail item={item} onBack={handleBack} />;
}

export default ItemDetail;