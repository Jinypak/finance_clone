'use client';

import { Button } from '@/components/ui/button';
import { useOpenHistory } from '@/features/history/hooks/use-open-history';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useDeleteHistory } from '@/features/history/api/use-delete-history';
import { useConfirm } from '@/hooks/use-confirm';

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const [ConfirmDialog, Confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this transaction'
  );
  const deleteMutation = useDeleteHistory(id);
  const { onOpen } = useOpenHistory();
  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate();
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={false} onClick={handleDelete}>
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
