import { motion } from 'framer-motion';
import { X, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { useQuote } from '@/context/QuoteContext';
import { useState } from 'react';
import preformsLineup from '@/assets/preforms-lineup.png';

interface ProductDetailModalProps {
    product: Product;
    onClose: () => void;
}

const sectorLabels: Record<string, string> = {
    bebidas: 'Bebidas',
    alimentacion: 'Alimentación',
    limpieza: 'Limpieza',
    higiene: 'Higiene',
};

const sectorColors: Record<string, string> = {
    bebidas: 'bg-blue-100 text-blue-700',
    alimentacion: 'bg-amber-100 text-amber-700',
    limpieza: 'bg-emerald-100 text-emerald-700',
    higiene: 'bg-violet-100 text-violet-700',
};

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
    const { addItem, setIsOpen } = useQuote();
    const [quantity, setQuantity] = useState(1);

    const handleAddToQuote = () => {
        addItem(product, quantity);
        setIsOpen(true);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl z-10 grid md:grid-cols-2 max-h-[85vh] md:max-h-[600px] overflow-y-auto"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left: Image */}
                <div className="relative h-72 md:h-full bg-gray-50 dark:bg-slate-800/50 flex items-center justify-center p-6">
                    <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        src={product.image || preformsLineup}
                        alt={product.name}
                        className="w-full h-full object-contain max-h-[300px]"
                    />
                    <span className={`absolute top-6 left-6 px-3 py-1.5 rounded-full text-xs font-bold ${sectorColors[product.sector]}`}>
                        {sectorLabels[product.sector]}
                    </span>
                </div>

                {/* Right: Details */}
                <div className="p-6 md:p-8 flex flex-col h-full bg-white dark:bg-slate-900">
                    <div className="flex-1">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl font-display font-bold text-foreground mb-3"
                        >
                            {product.name}
                        </motion.h2>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-2.5 py-1 rounded-lg bg-secondary/10 text-secondary-foreground font-medium text-xs">
                                {product.gramaje}g
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-muted-foreground font-medium text-xs">
                                Cuello: {product.tipoCuello}
                            </span>
                        </div>

                        <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                            {product.description || "Producto de alta calidad fabricado con los mejores estándares de la industria del plástico."}
                        </p>

                        <div className="space-y-4">
                            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-border/50">
                                <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                    Disponible para pedido
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    Este producto se fabrica bajo demanda. Contáctanos para consultar tiempos de entrega.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 rounded-xl p-1">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                    <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-14 text-center font-bold text-sm">
                                    {quantity} <span className="text-[10px] font-normal text-muted-foreground">mil</span>
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <Button
                                size="lg"
                                onClick={handleAddToQuote}
                                className="flex-1 rounded-xl text-md h-10"
                            >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Agregar
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
