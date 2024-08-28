'use client';
import { useEffect, useState } from 'react';

import { NewAccountSheet } from '@/features/accounts/components/new-account-sheet';
import { EditAccountSheet } from '@/features/accounts/components/edit-account-sheet';
import { NewHistorySheet } from '@/features/history/components/new-history-sheet';
import { EditHistorySheet } from '@/features/history/components/edit-history-sheet';

export const SheetProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
      <NewHistorySheet />
      <EditHistorySheet />
    </>
  );
};
