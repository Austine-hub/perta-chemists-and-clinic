//src/components/header/Navbar.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Home } from 'lucide-react';
import Link from 'next/link';
import styles from './Navbar.module.css';



interface NavLink {
  label: string;
  path: string;
}

interface NavItem {
  label: string;
  key: string;
  path?: string;
  links?: NavLink[];
}

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Shop By Category",
    key: "category",
    links: [
      { label: "Skin Care", path: "/category/skincare" },
      { label: "Diabetes", path: "/category/diabetes" },      
      { label: "Beauty & Cosmetics", path: "/category/beauty" },
      { label: "Vitamins & Supplements", path: "/category/vitamins" },
      { label: "Medicine", path: "/category/medicine" },
      { label: "Hygiene", path: "/category/hygiene" },
      { label: "Home Healthcare", path: "/categories/home-healthcare" },
    ],
  },
  {
    label: "Shop By Condition",
    key: "condition",
    links: [
      { label: "Hypertension", path: "/conditions/htn" },
      { label: "Diabetes", path: "/conditions/diabetes" },
      { label: "Cough, Cold & Flu", path: "/conditions/flu" },
      { label: "UTI", path: "/conditions/uti" },
      { label: "Skin Treatment", path: "/conditions/skin" },
    ],
  },
  {
    label: "Shop By Body System",
    key: "system",
    links: [
      { label: "Cardiovascular", path: "/system/cvs" },
      { label: "Reproductive", path: "/system/reproductive" },
      { label: "Respiratory", path: "/system/respiratory" },
      { label: "GIT", path: "/system/git" },
      { label: "Renal", path: "/system/renal" },
      { label: "Nervous", path: "/system/cns" },
      { label: "Oral Hygiene", path: "/system/oral" },
      { label: "MSK", path: "/system/msk" },
    ],
  },
  { label: "Offers", key: "offers", path: "/offers" },
  { label: "Dashboard", key: "dashboard", path: "/dashboard" },
 ];

export default function Navbar({ isOpen, onClose }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeDropdown) return;
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [activeDropdown]);

  const handleClose = () => {
    onClose();
    setActiveDropdown(null);
  };

  return (
    <nav className={`${styles.navbar} ${isOpen ? styles.open : ''}`} ref={navRef} aria-label="Main navigation">
      <div className={styles.mobileHeader}>
        <h2 className={styles.mobileTitle}>Menu</h2>
        <button onClick={onClose} className={styles.closeBtn} aria-label="Close navigation">
          <X size={24} />
        </button>
      </div>

      <div className={styles.container}>
        <div className={styles.desktopNav}>
          <Link href="/" className={styles.homeSection} aria-label="Home" onClick={handleClose}>
            <Home size={24} />
            <span className={styles.homeText}>Home</span>
          </Link>

          {NAV_ITEMS.map((item) =>
            item.links ? (
              <div key={item.key} className={styles.dropdownWrapper}>
                <button
                  className={`${styles.navBtn} ${activeDropdown === item.key ? styles.active : ''}`}
                  onClick={() => setActiveDropdown(activeDropdown === item.key ? null : item.key)}
                  aria-expanded={activeDropdown === item.key}
                  aria-haspopup="true"
                >
                  {item.label} <ChevronDown size={16} aria-hidden="true" />
                </button>
                {activeDropdown === item.key && (
                  <div className={styles.dropdown} role="menu">
                    <ul className={styles.columnList}>
                      {item.links.map((link, i) => (
                        <li key={i}>
                          <Link href={link.path} role="menuitem" onClick={handleClose}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.key} href={item.path || '#'} className={styles.navLink} onClick={handleClose}>
                {item.label}
              </Link>
            )
          )}

          <div className={styles.actions}>
            <Link href="/consultation" className={styles.btnDark} onClick={handleClose}>
              Speak to a Doctor
            </Link>
            <Link href="/prescriptions" className={styles.btnGreen} onClick={handleClose}>
              Upload a Prescription
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}










