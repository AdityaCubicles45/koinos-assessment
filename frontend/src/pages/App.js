import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Items from './Items';
import ItemDetail from './ItemDetail';
import { DataProvider } from '../state/DataContext';

const navStyles = {
  nav: {
    padding: '16px 24px',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  link: {
    textDecoration: 'none',
    color: '#1a1a1a',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'color 0.2s'
  }
};

function App() {
  return (
    <DataProvider>
      <nav style={navStyles.nav}>
        <Link to="/" style={navStyles.link}>Items</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="/items/:id" element={<ItemDetail />} />
      </Routes>
    </DataProvider>
  );
}

export default App;