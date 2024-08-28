'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';
import { Loader2, Plus } from 'lucide-react';
import React, { useEffect } from 'react';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { Skeleton } from '@/components/ui/skeleton';
import { useBulkDeleteAccount } from '@/features/accounts/api/use-bulk-delete';

type Props = {};

const CategoriesPage = (props: Props) => {
  const newAccount = useNewAccount();
  const accountQuery = useGetAccounts();
  const deleteAccount = useBulkDeleteAccount();

  const isDisabled = accountQuery.isLoading || deleteAccount.isPending;

  const accounts = accountQuery.data || [];
  if (accountQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-8 w-48" />
            <CardContent>
              <div className="h-[500px] w-full flex items-center justify-center">
                <Loader2 className="size-6 text-slate-300 animate-spin" />
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">AccountPage</CardTitle>
          <Button onClick={newAccount.onOpen} size="sm">
            <Plus name="size-4 mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            disabled={isDisabled}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteAccount.mutate({ ids });
            }}
            filterKey="id"
            columns={columns}
            data={accounts}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
