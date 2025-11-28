import { toast } from 'sonner';
import { clearAllData } from '../lib/db';

export const usePanicDelete = (onDeleted?: () => void) => {
  const panicDelete = async () => {
    const toastId = toast.loading('Deleting all your data...');
    try {
      await clearAllData();
      toast.success('All your data has been securely deleted.', { id: toastId });
      if (onDeleted) {
        onDeleted();
      }
    } catch (error) {
      console.error('Error during panic delete:', error);
      toast.error('Could not delete data. Please try clearing your browser cache.', { id: toastId });
    }
  };

  return panicDelete;
};