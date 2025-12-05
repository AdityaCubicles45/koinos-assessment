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
    color: 'inherit',
    overflow: 'hidden'
  },
  cardHover: {
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    transform: 'translateY(-2px)'
  },
  imageContainer: {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease-in-out'
  },
  imageLoading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    color: '#9ca3af',
    fontSize: '14px'
  },
  imageError: {
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af',
    fontSize: '12px'
  },
  header: {
    padding: '16px 20px 12px'
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
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const imageUrl = React.useMemo(() => getImageUrl(item.name, item.category), [item.name, item.category]);

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
              ...(isHovered ? { transform: 'scale(1.05)' } : {}),
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

