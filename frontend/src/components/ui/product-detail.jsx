import React, { useState } from 'react';

const imageMap = {
  'Laptop Pro': 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Computers%20Peripherals/Laptop/Images/310938_0_sgvggv.png?tr=w-1000',
  'Noise Cancelling Headphones': 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/319022_0_miv5zDLbY.png?updatedAt=1763650200629?tr=w-1000',
  'Ultra‑Wide Monitor': 'https://m.media-amazon.com/images/I/41Fgc-hw+hL._SX300_SY300_QL70_FMwebp_.jpg',
  'Ergonomic Chair': 'https://m.media-amazon.com/images/I/71VGJKSnDiL._SX679_.jpg',
  'Standing Desk': 'https://m.media-amazon.com/images/I/41Uz0WSy2gL._SY300_SX300_QL70_FMwebp_.jpg'
};

const getImageUrl = (itemName) => {
  return imageMap[itemName] || `https://source.unsplash.com/800x600/?${itemName.toLowerCase().replace(/\s+/g, '+')}`;
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
    minHeight: 'calc(100vh - 80px)'
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '24px',
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'color 0.2s'
  },
  productContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    marginTop: '24px'
  },
  imageSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  mainImage: {
    width: '100%',
    height: '500px',
    objectFit: 'contain',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    padding: '20px'
  },
  thumbnailContainer: {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto'
  },
  thumbnail: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'all 0.2s',
    padding: '4px'
  },
  thumbnailActive: {
    borderColor: '#007bff'
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    fontSize: '12px',
    fontWeight: '600',
    padding: '6px 12px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    width: 'fit-content'
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#111827',
    margin: 0,
    lineHeight: '1.2'
  },
  category: {
    fontSize: '16px',
    color: '#6b7280',
    fontWeight: '500'
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  stars: {
    color: '#fbbf24',
    fontSize: '20px'
  },
  ratingText: {
    fontSize: '14px',
    color: '#6b7280'
  },
  priceSection: {
    padding: '24px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  },
  price: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#007bff',
    margin: 0,
    lineHeight: '1'
  },
  priceLabel: {
    fontSize: '16px',
    color: '#6b7280',
    marginTop: '8px'
  },
  description: {
    fontSize: '16px',
    color: '#4b5563',
    lineHeight: '1.6',
    marginTop: '8px'
  },
  features: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '15px',
    color: '#4b5563'
  },
  featureIcon: {
    color: '#10b981',
    fontSize: '20px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px'
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#007bff',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    padding: '16px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    color: '#007bff',
    fontSize: '16px',
    fontWeight: '600',
    padding: '16px 24px',
    borderRadius: '8px',
    border: '2px solid #007bff',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  specs: {
    marginTop: '32px',
    paddingTop: '32px',
    borderTop: '1px solid #e5e7eb'
  },
  specRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #f3f4f6'
  },
  specLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  },
  specValue: {
    fontSize: '14px',
    color: '#111827',
    fontWeight: '400'
  }
};

function ProductDetail({ item, onBack }) {
  const [selectedImage, setSelectedImage] = useState(getImageUrl(item.name));
  const [quantity, setQuantity] = useState(1);

  const mainImage = getImageUrl(item.name);
  const thumbnails = [mainImage, mainImage, mainImage];

  const features = [
    'Premium quality materials',
    'Excellent performance',
    'Durable construction',
    'Warranty included'
  ];

  const specs = [
    { label: 'Category', value: item.category || 'N/A' },
    { label: 'SKU', value: `SKU-${item.id}` },
    { label: 'Availability', value: 'In Stock' },
    { label: 'Brand', value: 'Premium' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.backButton} onClick={onBack}>
        ← Back to Items
      </div>
      
      <div style={styles.productContainer}>
        <div style={styles.imageSection}>
          <img
            src={selectedImage}
            alt={item.name}
            style={styles.mainImage}
          />
          <div style={styles.thumbnailContainer}>
            {thumbnails.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`${item.name} thumbnail ${index + 1}`}
                style={{
                  ...styles.thumbnail,
                  ...(selectedImage === thumb ? styles.thumbnailActive : {})
                }}
                onClick={() => setSelectedImage(thumb)}
              />
            ))}
          </div>
        </div>

        <div style={styles.infoSection}>
          <div>
            <span style={styles.badge}>Top Rated</span>
            <h1 style={styles.title}>{item.name}</h1>
            <div style={styles.category}>{item.category || 'Product'}</div>
            
            <div style={styles.rating}>
              <span style={styles.stars}>★★★★★</span>
              <span style={styles.ratingText}>(4.8) · 124 reviews</span>
            </div>
          </div>

          <div style={styles.priceSection}>
            <div style={styles.price}>
              ${item.price?.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }) || '0.00'}
            </div>
            <div style={styles.priceLabel}>per unit</div>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#111827' }}>
              Description
            </h3>
            <p style={styles.description}>
              {item.description || `High-quality ${item.name.toLowerCase()} with excellent features and performance. This premium product is designed to meet the highest standards of quality and durability.`}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#111827' }}>
              Key Features
            </h3>
            <ul style={styles.features}>
              {features.map((feature, index) => (
                <li key={index} style={styles.feature}>
                  <span style={styles.featureIcon}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.buttonGroup}>
            <button style={styles.primaryButton}>
              Add to Cart
              <span>🛒</span>
            </button>
            <button style={styles.secondaryButton}>
              Buy Now
            </button>
          </div>

          <div style={styles.specs}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
              Specifications
            </h3>
            {specs.map((spec, index) => (
              <div key={index} style={styles.specRow}>
                <span style={styles.specLabel}>{spec.label}</span>
                <span style={styles.specValue}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

