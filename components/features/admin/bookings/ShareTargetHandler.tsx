'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

/**
 * Extracts phone and name from messy strings (like vCard format, plain text "Name: 07...", or raw numbers).
 */
export function extractSharedContact(titleParam: string, textParam: string) {
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
  } 
  // 2. Format custom cu paranteze ex: "[Name] Roger \n [Mobile] 07xxx"
  else if (fullString.includes('[Name]') || fullString.includes('[Mobile]') || fullString.includes('[Phone]')) {
    const nameMatch = fullString.match(/\[Name\]\s*(.*)/i);
    if (nameMatch && nameMatch[1]) {
      name = nameMatch[1].trim();
    }
    const phoneMatch = fullString.match(/\[(?:Mobile|Phone|Telefon)\]\s*(.*)/i);
    if (phoneMatch && phoneMatch[1]) {
      phone = phoneMatch[1].trim();
    }
  } 
  else {
    // 3. Text simplu sau combinat ("Ion Popescu 0755123456")
    // Extragem cea mai lungă secvență care seamănă cu un număr de telefon
    const phoneRegex = /(\+?(?:[0-9]\s*-?){9,14}[0-9])/;
    const phoneMatch = textParam.match(phoneRegex);
    
    if (phoneMatch && phoneMatch[1]) {
      phone = phoneMatch[1];
      // Scoatem porțiunea de telefon din text pentru a vedea dacă a rămas vreun nume
      const remainingText = textParam.replace(phone, '').trim();
      if (!name && remainingText.length > 2 && remainingText.length < 30) {
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

interface ShareTargetHandlerProps {
  onOpen: () => void;
}

export default function ShareTargetHandler({ onOpen }: ShareTargetHandlerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!searchParams) return;
    
    const rawText = searchParams.get('quickbookPhone') || '';
    const rawTitle = searchParams.get('quickbookName') || '';

    if (!rawText && !rawTitle) return;

    const { name, phone } = extractSharedContact(rawTitle, rawText);
    
    if (phone) {
      sessionStorage.setItem('tempSharedPhone', phone);
      sessionStorage.setItem('tempSharedName', name);
      onOpen();
      
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('quickbookPhone');
      newParams.delete('quickbookName');
      const newUrl = `${pathname}${newParams.toString() ? `?${newParams.toString()}` : ''}`;
      
      router.replace(newUrl);
    }
  }, [searchParams, pathname, router, onOpen]);

  return null;
}
