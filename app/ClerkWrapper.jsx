// components/ClerkWrapper.js
'use client';
import { ClerkProvider } from '@clerk/nextjs';

export default function ClerkWrapper({ children }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
