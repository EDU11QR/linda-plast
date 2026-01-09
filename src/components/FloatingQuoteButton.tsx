import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList } from 'lucide-react';
import { useQuote } from '@/context/QuoteContext';

const FloatingQuoteButton = () => {
  const { totalItems, setIsOpen, isOpen } = useQuote();

  if (totalItems === 0 || isOpen) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground rounded-full p-4 floating-shadow flex items-center gap-3 pr-6"
      >
        <div className="relative">
          <ClipboardList className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center font-bold">
            {totalItems}
          </span>
        </div>
        <span className="font-medium">Ver Cotización</span>
      </motion.button>
    </AnimatePresence>
  );
};

export default FloatingQuoteButton;
