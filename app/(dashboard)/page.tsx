'use client';

import { Button } from '@/components/ui/button';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';

type HSMRequestOption = {
  method: string;
  headers: Headers;
  redirect: string;
};

async function getData() {
  const res = await fetch('https://192.168.0.107/api/lunasa');

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  // const data = await getData();
  return (
    <>
      <Button onClick={() => {}}>Add an account</Button>
      <div>
        {/* { && accounts.map((account: any) => <div>{account.id}</div>)} */}
      </div>
    </>
  );
}
