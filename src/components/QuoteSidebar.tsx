import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, FileText, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuote } from '@/context/QuoteContext';
import { useState } from 'react';
import QuoteModal from './QuoteModal';

const QuoteSidebar = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, clearQuote } = useQuote();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-foreground">
                      Lista de Cotización
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {items.length} {items.length === 1 ? 'producto' : 'productos'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                      <FileText className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Tu lista está vacía
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Agrega productos desde el catálogo para solicitar una cotización personalizada.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-muted/50 rounded-xl p-4 border border-border"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-foreground text-sm">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {item.product.gramaje}g • Cuello: {item.product.tipoCuello}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Cantidad (millares)</span>
                          <div className="flex items-center gap-2 bg-background rounded-lg p-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-10 text-center font-medium text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border space-y-3">
                  <div className="bg-muted/50 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total productos</span>
                      <span className="font-semibold text-foreground">{items.length}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">Total millares</span>
                      <span className="font-semibold text-foreground">
                        {items.reduce((sum, item) => sum + item.quantity, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full rounded-xl"
                    onClick={() => setShowModal(true)}
                  >
                    Solicitar Presupuesto
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-muted-foreground"
                    onClick={clearQuote}
                  >
                    Limpiar lista
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <QuoteModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default QuoteSidebar;
