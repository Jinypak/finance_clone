import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { HistoryForm } from '@/features/history/components/history-form';
import { z } from 'zod';
import { insertHistorySchema } from '@/db/schema';
import { useEditHistory } from '../api/use-edit-history';
import { useDeleteHistory } from '../api/use-delete-history';
import { useOpenHistory } from '../hooks/use-open-history';
import { useGetHistory } from '../api/use-get-history';
import { Loader2 } from 'lucide-react';
import { useConfirm } from '@/hooks/use-confirm';

const formSchema = insertHistorySchema.pick({
  company: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditHistorySheet = () => {
  const { isOpen, onClose, id } = useOpenHistory();
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this history'
  );

  const historyQuery = useGetHistory();
  const editMutation = useEditHistory(id);
  const deleteMutation = useDeleteHistory(id);

  const isLoading = historyQuery.isLoading;
  const isPending = editMutation.isPending || deleteMutation.isPending;

  const onSubmit = (values: any) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: (undefined) => {
          onClose();
        },
      });
    }
  };

  const defaultValues = historyQuery.data
    ? {
        name: historyQuery.data.name,
      }
    : {
        name: '',
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit History</SheetTitle>
            <SheetDescription>
              Edit history to track your transactions
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <HistoryForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
