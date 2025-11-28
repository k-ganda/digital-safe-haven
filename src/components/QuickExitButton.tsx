import { Zap } from 'lucide-react';
import { usePanicDelete } from '../hooks/usePanicDelete';

const QuickExitButton = () => {
  const { panic } = usePanicDelete();

  return (
    <button
      onClick={panic}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-coral-red text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-colors duration-300"
    >
      <Zap size={18} />
      <span>Quick Exit</span>
    </button>
  );
};

export default QuickExitButton;