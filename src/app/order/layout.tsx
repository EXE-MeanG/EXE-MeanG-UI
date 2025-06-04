import { ReactNode, Suspense } from 'react';

export default function OrderLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      {children}
    </Suspense>
  );
}