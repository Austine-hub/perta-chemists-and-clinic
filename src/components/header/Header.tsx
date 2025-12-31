//src/components/header/Header.tsx

import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Menu, Search, Heart, Repeat, User, ShoppingBag } from 'lucide-react';
import styles from './Header.module.css';
import { useCartCount, useCartSubtotal } from '@/context/CartContext';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const totalItems = useCartCount();
  const subtotal = useCartSubtotal();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search query:', searchQuery);
      // TODO: Implement search functionality
      // Example: router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  }, [searchQuery]);

  const formattedPrice = useMemo(() => 
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(subtotal),
    [subtotal]
  );

  const cartAriaLabel = useMemo(() => 
    `Shopping cart with ${totalItems} ${totalItems === 1 ? 'item' : 'items'}, total ${formattedPrice}`,
    [totalItems, formattedPrice]
  );

  const displayBadge = totalItems > 99 ? '99+' : totalItems;

  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        {/* Logo Section - Extreme Left */}
        <div className={styles.logoSection}>
          <Link href="/" className={styles.logoLink} aria-label="Marplewood Pharmacy - Home">
            <div className={styles.logo}>
              <span className={styles.logoText}>PERTA</span>
              <span className={styles.logoSubtext}>CLINIC <span className={styles.logoSubtext}>AND </span> 
              PHARMACY
              </span>
              <span className={styles.logoTagline}>Caring Beyond Prescriptions</span>
            </div>
          </Link>
        </div>

        {/* Search Section - Full Width on Mobile */}
        <div className={styles.searchSection}>
          <form onSubmit={handleSearch} className={styles.searchForm} role="search">
            <label htmlFor="search-input" className={styles.visuallyHidden}>
              Search everything at PERTA CLINIC  AND PHARMACY
            </label>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} aria-hidden="true" />
              <input
                id="search-input"
                type="search"
                className={styles.searchInput}
                placeholder="Search everything at Perta clinic and  Pharmacy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
              />
            </div>
            <button
              type="submit"
              className={styles.searchButton}
              aria-label="Submit search"
            >
              Search
            </button>
          </form>
        </div>

        {/* Actions Section - Desktop & Tablet */}
        <nav className={styles.actionsSection} aria-label="User actions">
          {/* Wishlist - Hidden on Mobile */}
          <Link
            href="/wishlist"
            className={styles.actionButton}
            aria-label="View wishlist"
            title="Wishlist"
          >
            <Heart size={24} />
          </Link>

          {/* Compare - Hidden on Mobile */}
          <Link
            href="/compare"
            className={styles.actionButton}
            aria-label="Compare products"
            title="Compare"
          >
            <Repeat size={24} />
          </Link>

          {/* Account - Hidden on Mobile */}
          <Link
            href="/auth/login"
            className={styles.actionButton}
            aria-label="Sign in to your account"
            title="Account"
          >
            <User size={24} />
            <div className={styles.accountInfo}>
              <span className={styles.accountLabel}>Sign In</span>
              <span className={styles.accountSubLabel}>Account</span>
            </div>
          </Link>

          {/* Cart - Always Visible, Next to Menu on Mobile */}
          <Link
            href="/cart"
            className={styles.cartButton}
            aria-label={cartAriaLabel}
            title="View Cart"
          >
            <div className={styles.cartIconWrapper}>
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className={styles.cartBadge} aria-hidden="true">
                  {displayBadge}
                </span>
              )}
            </div>
            <div className={styles.cartPriceWrapper}>
              <span className={styles.cartPrice}>{formattedPrice}</span>
            </div>
          </Link>

          {/* Menu Button - Extreme Right on Mobile */}
          <button
            className={styles.menuButton}
            onClick={onMenuToggle}
            aria-label="Open navigation menu"
            type="button"
          >
            <Menu size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;