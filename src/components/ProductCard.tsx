import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { useQuote } from '@/context/QuoteContext';
import preformsLineup from '@/assets/preforms-lineup.png';

interface ProductCardProps {
  product: Product;
  index: number;
  onClick?: () => void; // Prop opcional para manejar el click en la tarjeta
}

// Etiquetas de sectores en español
const sectorLabels: Record<string, string> = {
  bebidas: 'Bebidas',
  alimentacion: 'Alimentación',
  limpieza: 'Limpieza',
  higiene: 'Higiene',
};

// Estilos de colores para las etiquetas de sector (fondo claro + borde + texto oscuro)
const sectorColors: Record<string, string> = {
  bebidas: 'bg-blue-100 text-blue-700 border border-blue-200 shadow-sm',
  alimentacion: 'bg-amber-100 text-amber-700 border border-amber-200 shadow-sm',
  limpieza: 'bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm',
  higiene: 'bg-violet-100 text-violet-700 border border-violet-200 shadow-sm',
};

/**
 * Componente Tarjeta de Producto.
 * Muestra la información resumida de un producto en la grilla.
 */
const ProductCard = ({ product, index, onClick }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem, setIsOpen } = useQuote();

  // Agregar a la cotización (Carrito)
  const handleAddToQuote = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita abrir el modal al hacer click en "Añadir"
    addItem(product, quantity);
    setIsOpen(true);
    setQuantity(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className="card-industrial rounded-2xl overflow-hidden bg-card border border-border group cursor-pointer hover:shadow-lg transition-all duration-300"
    >
      {/* Sección de Imagen */}
      <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        <img
          src={product.image || preformsLineup}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {/* Etiqueta de Sector */}
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${sectorColors[product.sector]}`}>
          {sectorLabels[product.sector]}
        </span>
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-foreground mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {product.description}
        </p>

        {/* Especificaciones */}
        <div className="flex gap-2 mb-4">
          <span className="px-2 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground">
            {product.gramaje}g
          </span>
          <span className="px-2 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground">
            Cuello: {product.tipoCuello}
          </span>
        </div>

        {/* Selector de Cantidad y Botón Añadir */}
        {/* stopPropagation evita que al cambiar la cantidad se abra el modal */}
        <div className="flex items-center justify-between gap-3" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-md bg-background flex items-center justify-center hover:bg-muted-foreground/10 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-medium text-sm">
              {quantity} mil
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-md bg-background flex items-center justify-center hover:bg-muted-foreground/10 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <Button
            size="sm"
            onClick={handleAddToQuote}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Añadir
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
