import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const styles = {
  container: {
    padding: '24px',
    maxWidth: '800px',
    margin: '0 auto',
    minHeight: 'calc(100vh - 80px)'
  },
  backLink: {
    display: 'inline-block',
    marginBottom: '24px',
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500'
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '32px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '24px',
    color: '#1a1a1a'
  },
  detailRow: {
    padding: '16px 0',
    borderBottom: '1px solid #f0f0f0'
  },
  detailRowLast: {
    borderBottom: 'none'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  value: {
    fontSize: '18px',
    color: '#1a1a1a'
  },
  price: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#007bff'
  },
  loading: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#999'
  }
};

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/items/${id}`)
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

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading} role="status" aria-live="polite">
          Loading item details...
        </div>
      </div>
    );
  }

  if (!item) return null;

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backLink} aria-label="Back to items list">
        ← Back to Items
      </Link>
      <div style={styles.card}>
        <h2 style={styles.title}>{item.name}</h2>
        <div style={styles.detailRow}>
          <div style={styles.label}>Category</div>
          <div style={styles.value}>{item.category || 'N/A'}</div>
        </div>
        <div style={{ ...styles.detailRow, ...styles.detailRowLast }}>
          <div style={styles.label}>Price</div>
          <div style={{ ...styles.value, ...styles.price }}>
            ${item.price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;