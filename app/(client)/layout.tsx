import React from 'react';
import BottomNav from '@/components/layout/BottomNav';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="client-layout">
      <main>{children}</main>
      <BottomNav />
    </div>
  );
}
