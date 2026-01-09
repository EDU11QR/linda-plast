import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Building2, MapPin, Mail, Phone, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuote } from '@/context/QuoteContext';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const { items, clearQuote, setIsOpen: setQuoteSidebarOpen } = useQuote();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    empresa: '',
    volumenEstimado: '',
    ciudad: '',
    email: '',
    telefono: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      clearQuote();
      setQuoteSidebarOpen(false);
      onClose();
      setIsSubmitted(false);
      setFormData({
        empresa: '',
        volumenEstimado: '',
        ciudad: '',
        email: '',
        telefono: '',
      });
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-background rounded-2xl w-full max-w-lg overflow-hidden floating-shadow"
          >
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Solicitar Presupuesto
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Complete sus datos y le contactaremos
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Summary */}
                <div className="px-6 py-4 bg-muted/30 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <Package className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {items.length} productos seleccionados
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Total: {items.reduce((sum, item) => sum + item.quantity, 0).toLocaleString()} millares
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="empresa" className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      Nombre de Empresa
                    </Label>
                    <Input
                      id="empresa"
                      placeholder="Ej: Embotelladora ABC S.A."
                      required
                      value={formData.empresa}
                      onChange={(e) =>
                        setFormData({ ...formData, empresa: e.target.value })
                      }
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="volumen" className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      Volumen Estimado Mensual
                    </Label>
                    <Input
                      id="volumen"
                      placeholder="Ej: 500,000 unidades"
                      required
                      value={formData.volumenEstimado}
                      onChange={(e) =>
                        setFormData({ ...formData, volumenEstimado: e.target.value })
                      }
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ciudad" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      Ciudad
                    </Label>
                    <Input
                      id="ciudad"
                      placeholder="Ej: Lima, Arequipa, Trujillo"
                      required
                      value={formData.ciudad}
                      onChange={(e) =>
                        setFormData({ ...formData, ciudad: e.target.value })
                      }
                      className="rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="correo@empresa.com"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        Teléfono
                      </Label>
                      <Input
                        id="telefono"
                        type="tel"
                        placeholder="+51 999 999 999"
                        required
                        value={formData.telefono}
                        onChange={(e) =>
                          setFormData({ ...formData, telefono: e.target.value })
                        }
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full rounded-xl mt-6">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Solicitud
                  </Button>
                </form>
              </>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-secondary" />
                </motion.div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                  ¡Solicitud Enviada!
                </h3>
                <p className="text-muted-foreground">
                  Nuestro equipo comercial se pondrá en contacto contigo en las próximas 24 horas.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
