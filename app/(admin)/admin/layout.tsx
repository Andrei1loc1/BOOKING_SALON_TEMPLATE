'use client';
import React, { Suspense, useEffect } from 'react';
import BottomNav from '@/components/layout/BottomNav';
import type { NavItem } from '@/components/layout/BottomNav';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const DashboardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const BookingsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

import QuickPhoneBookingModal from '@/components/features/admin/bookings/QuickPhoneBookingModal';
import { Plus } from 'lucide-react';

const adminNavItems: NavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { href: '/admin/bookings', label: 'Rezervări', icon: BookingsIcon },
  { href: '/admin/users', label: 'Utilizatori', icon: UsersIcon },
  { href: '/admin/settings', label: 'Setări', icon: SettingsIcon },
];

/**
 * Extracts phone and name from messy strings (like vCard format, plain text "Name: 07...", or raw numbers).
 */
function extractSharedContact(titleParam: string, textParam: string) {
  let name = titleParam || '';
  let phone = '';

  const fullString = `${titleParam} \n ${textParam}`;

  // 1. Daca e vCard (are BEGIN:VCARD)
  if (fullString.includes('BEGIN:VCARD')) {
    const telMatch = fullString.match(/TEL.*:(.*)/);
    if (telMatch && telMatch[1]) {
      phone = telMatch[1].trim();
    }
    const nameMatch = fullString.match(/FN:(.*)/);
    if (nameMatch && nameMatch[1]) {
      name = nameMatch[1].trim();
    }
  } else {
    // 2. Text simplu sau combinat ("Ion Popescu 0755123456")
    // Extragem cea mai lungă secvență care seamănă cu un număr de telefon
    // Această expresie caută secvențe care pot conține + la început, cifre, spații, liniuțe (minim 9 caractere)
    const phoneRegex = /(\+?(?:[0-9]\s*-?){9,14}[0-9])/;
    const phoneMatch = textParam.match(phoneRegex);
    
    if (phoneMatch && phoneMatch[1]) {
      phone = phoneMatch[1];
      // Scoatem porțiunea de telefon din text pentru a vedea dacă a rămas vreun nume
      const remainingText = textParam.replace(phone, '').trim();
      if (!name && remainingText.length > 2 && remainingText.length < 30) {
        // Dacă title era gol, considerăm textul rămas ca fiind numele (fără litere ciudate)
        name = remainingText.replace(/[^a-zA-ZăâîșțĂÂÎȘȚ \-]/g, '').trim();
      }
    } else {
      // Fallback: the whole text is probably just a raw phone number
      phone = textParam;
    }
  }

  // Curățăm numărul găsit
  phone = phone.replace(/\D/g, ''); // păstrăm doar cifrele
  if (phone.startsWith('40') && phone.length === 11) {
    phone = '0' + phone.substring(2);
  }

  return { name, phone };
}

function ShareTargetHandler({ onOpen }: { onOpen: () => void }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!searchParams) return;
    
    // OS Web Share trimite în general title și text (text e folosit aici ptr număr conf. manifest.json)
    const rawText = searchParams.get('quickbookPhone') || '';
    const rawTitle = searchParams.get('quickbookName') || '';

    if (!rawText && !rawTitle) return;

    const { name, phone } = extractSharedContact(rawTitle, rawText);
    
    if (phone) {
      // Store in session storage so the modal can pick it up when it opens
      sessionStorage.setItem('tempSharedPhone', phone);
      sessionStorage.setItem('tempSharedName', name);
      onOpen();
      
      // Remove query params from URL so it doesn't trigger again on refresh
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('quickbookPhone');
      newParams.delete('quickbookName');
      const newUrl = `${pathname}${newParams.toString() ? `?${newParams.toString()}` : ''}`;
      // Use replace to not bloat browser history
      router.replace(newUrl);
    }
  }, [searchParams, pathname, router, onOpen]);

  return null;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isQuickBookingOpen, setIsQuickBookingOpen] = React.useState(false);

  return (
    <div className="admin-layout">
      <main>{children}</main>

      <Suspense fallback={null}>
        <ShareTargetHandler onOpen={() => setIsQuickBookingOpen(true)} />
      </Suspense>
      
      {/* Quick Booking Modal for phone calls */}
      <QuickPhoneBookingModal 
        open={isQuickBookingOpen} 
        onOpenChange={setIsQuickBookingOpen} 
      />

      <BottomNav 
        items={adminNavItems} 
        centerAction={
          <div 
            className="bottom-nav__item" 
            style={{ cursor: 'pointer', paddingLeft: 8, paddingRight: 8, minWidth: 64 }} 
            onClick={() => setIsQuickBookingOpen(true)}
          >
            <div className="bottom-nav__icon">
              <div className="bottom-nav__center-btn">
                <Plus size={26} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
