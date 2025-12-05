import React from 'react';
import { Link } from 'react-router-dom';

const cardStyles = {
  card: {
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    color: 'inherit'
  },
  cardHover: {
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    transform: 'translateY(-2px)'
  },
  header: {
    padding: '20px 20px 12px'
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    margin: 0,
    marginBottom: '8px',
    lineHeight: '1.4'
  },
  category: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  content: {
    padding: '0 20px',
    flex: 1
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px'
  },
  price: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#007bff'
  },
  priceLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '400'
  },
  footer: {
    padding: '16px 20px 20px',
    borderTop: '1px solid #f3f4f6',
    marginTop: 'auto'
  }
};

function ItemCard({ item }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link
      to={`/items/${item.id}`}
      style={{
        ...cardStyles.card,
        ...(isHovered ? cardStyles.cardHover : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`View details for ${item.name}`}
    >
      <div style={cardStyles.header}>
        <h3 style={cardStyles.title}>{item.name}</h3>
        <div style={cardStyles.category}>{item.category || 'Uncategorized'}</div>
      </div>
      <div style={cardStyles.content}>
        <div style={cardStyles.priceContainer}>
          <span style={cardStyles.price}>
            ${item.price?.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }) || '0.00'}
          </span>
        </div>
      </div>
      <div style={cardStyles.footer}>
        <span style={{
          fontSize: '12px',
          color: '#9ca3af',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          View Details →
        </span>
      </div>
    </Link>
  );
}

export default ItemCard;

