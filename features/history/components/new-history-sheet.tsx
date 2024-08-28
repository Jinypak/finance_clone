import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useNewHistory } from '../hooks/use-new-history';
import { HistoryForm } from '@/features/history/components/history-form';
import { z } from 'zod';
import { insertHistorySchema } from '@/db/schema';
import { useCreateHistory } from '../api/use-create-history';

const formSchema = insertHistorySchema.pick({
  company: true,
  type: true,
  model: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewHistorySheet = () => {
  const { isOpen, onClose } = useNewHistory();

  const mutation = useCreateHistory();

  const onSubmit = (values: any) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New History</SheetTitle>
          <SheetDescription>
            Create a new History to track your transactions
          </SheetDescription>
        </SheetHeader>
        <HistoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ company: '', type: '', model: '' }}
        />
      </SheetContent>
    </Sheet>
  );
};
