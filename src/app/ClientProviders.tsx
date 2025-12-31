// src/app/ClientProviders.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CompareProvider } from '@/context/CompareContext';
import { Toaster } from 'react-hot-toast';

import Header from '@/components/header/Header';
import Navbar from '@/components/header/Navbar';
import Footer from '@/components/footer/Footer';
import BottomNav from '@/components/footer/BottomNav';
import Loader from '@/components/common/Loader';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle route changes
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    setIsMenuOpen(false);
    return () => clearTimeout(timeout);
  }, [pathname]);



  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);



  return (
    <CartProvider>
      <WishlistProvider>
        <CompareProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1de00bff',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#1de00bff',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />

          {loading && <Loader mode="fullscreen" />}


          <Header
            onMenuToggle={handleMenuToggle}
            
          />

          <Navbar isOpen={isMenuOpen} onClose={handleMenuClose} />

          <main className="app-main">{children}</main>


          <Footer />
          <BottomNav />
        </CompareProvider>
      </WishlistProvider>
    </CartProvider>
  );
}