import React from 'react';
import { Link } from 'react-router-dom';

const imageMap = {
  'Laptop Pro': 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Computers%20Peripherals/Laptop/Images/310938_0_sgvggv.png?tr=w-1000',
  'Noise Cancelling Headphones': 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/319022_0_miv5zDLbY.png?updatedAt=1763650200629?tr=w-1000',
  'Ultra‑Wide Monitor': 'https://m.media-amazon.com/images/I/41Fgc-hw+hL._SX300_SY300_QL70_FMwebp_.jpg',
  'Ergonomic Chair': 'https://m.media-amazon.com/images/I/71VGJKSnDiL._SX679_.jpg',
  'Standing Desk': 'https://m.media-amazon.com/images/I/41Uz0WSy2gL._SY300_SX300_QL70_FMwebp_.jpg'
};

const getImageUrl = (itemName, category) => {
  if (imageMap[itemName]) {
    return imageMap[itemName];
  }
  const searchTerm = itemName.toLowerCase().replace(/\s+/g, '+');
  const categoryTerm = category ? category.toLowerCase() : '';
  const keyword = searchTerm || categoryTerm || 'product';
  return `https://source.unsplash.com/400x300/?${keyword}`;
};

const cardStyles = {
  card: {
    borderRadius: '16px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    color: 'inherit',
    overflow: 'hidden',
    position: 'relative'
  },
  cardHover: {
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-4px)',
    borderColor: '#d1d5db'
  },
  imageContainer: {
    width: '100%',
    height: '240px',
    overflow: 'hidden',
    backgroundColor: '#f9fafb',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease-in-out'
  },
  imageLoading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    color: '#6b7280',
    fontSize: '14px',
    height: '100%'
  },
  imageError: {
    backgroundColor: '#f9fafb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
    fontSize: '12px',
    height: '100%'
  },
  contentSection: {
    padding: '20px',
    backgroundColor: '#ffffff',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px'
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
    margin: 0,
    lineHeight: '1.3',
    flex: 1
  },
  topRatedTag: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
    fontSize: '11px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    whiteSpace: 'nowrap'
  },
  metaInfo: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '400',
    marginTop: '4px'
  },
  description: {
    fontSize: '15px',
    color: '#4b5563',
    lineHeight: '1.5',
    marginTop: '8px',
    flex: 1
  },
  footerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '16px',
    borderTop: '1px solid #f3f4f6'
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  price: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#007bff',
    lineHeight: '1'
  },
  priceLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '400'
  },
  bookButton: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.2s ease-in-out'
  },
  bookButtonHover: {
    backgroundColor: '#0056b3'
  }
};

function ItemCard({ item }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const imageUrl = React.useMemo(() => getImageUrl(item.name, item.category), [item.name, item.category]);

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = `/items/${item.id}`;
  };

  return (
    <div
      style={{
        ...cardStyles.card,
        ...(isHovered ? cardStyles.cardHover : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      }}
      aria-label={`View details for ${item.name}`}
    >
      <div style={cardStyles.imageContainer}>
        {!imageLoaded && !imageError && (
          <div style={cardStyles.imageLoading}>Loading image...</div>
        )}
        {imageError ? (
          <div style={cardStyles.imageError}>
            <span>No image available</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={item.name}
            style={{
              ...cardStyles.image,
              ...(isHovered ? { transform: 'scale(1.1)' } : {}),
              display: imageLoaded ? 'block' : 'none'
            }}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(false);
            }}
            loading="lazy"
          />
        )}
      </div>
      <div style={cardStyles.contentSection}>
        <div style={cardStyles.headerRow}>
          <h3 style={cardStyles.title}>{item.name}</h3>
          <span style={cardStyles.topRatedTag}>Top rated</span>
        </div>
        <div style={cardStyles.metaInfo}>
          {item.category || 'Product'} • Premium quality
        </div>
        <div style={cardStyles.description}>
          {item.description || `High-quality ${item.name.toLowerCase()} with excellent features and performance.`}
        </div>
        <div style={cardStyles.footerRow}>
          <div style={cardStyles.priceContainer}>
            <span style={cardStyles.price}>
              ${item.price?.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }) || '0.00'}
            </span>
            <span style={cardStyles.priceLabel}>/ unit</span>
          </div>
          <button
            style={{
              ...cardStyles.bookButton,
              ...(isHovered ? cardStyles.bookButtonHover : {})
            }}
            onClick={handleClick}
            onMouseDown={(e) => e.preventDefault()}
          >
            View Details
            <span style={{ fontSize: '16px' }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;

