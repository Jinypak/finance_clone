'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNewHistory } from '@/features/history/hooks/use-new-history';
import { Loader2, Plus } from 'lucide-react';
import React, { useEffect } from 'react';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useGetHistory } from '@/features/history/api/use-get-history';
import { Skeleton } from '@/components/ui/skeleton';
import { useBulkDeleteHistory } from '@/features/history/api/use-bulk-delete';

type Props = {};

const HistoryPage = (props: Props) => {
  const newHistory = useNewHistory();
  const historyQuery = useGetHistory();
  const deleteHistory = useBulkDeleteHistory();

  const isDisabled = historyQuery.isLoading || deleteHistory.isPending;

  const history = historyQuery.data || [];
  if (historyQuery.isLoading) {
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
          <CardTitle className="text-xl line-clamp-1">HistoryPage</CardTitle>
          <Button onClick={newHistory.onOpen} size="sm">
            <Plus name="size-4 mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            disabled={isDisabled}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteHistory.mutate({ ids });
            }}
            filterKey="id"
            columns={columns}
            data={history}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryPage;
