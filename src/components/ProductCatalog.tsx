import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, GlassWater, UtensilsCrossed, SprayCan, Droplet, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, gramajeRanges, tipoCuelloOptions } from '@/data/products';
import ProductCard from './ProductCard';
import preformsLineup from '@/assets/preforms-lineup.png';

const sectorIcons: Record<string, React.ElementType> = {
  all: Layers,
  bebidas: GlassWater,
  alimentacion: UtensilsCrossed,
  limpieza: SprayCan,
  higiene: Droplet,
};

const sectors = [
  { id: 'all', label: 'Todos' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'alimentacion', label: 'Alimentación' },
  { id: 'limpieza', label: 'Limpieza' },
  { id: 'higiene', label: 'Higiene' },
];

const ProductCatalog = () => {
  const [activeSector, setActiveSector] = useState('all');
  const [activeGramaje, setActiveGramaje] = useState<{ min: number; max: number } | null>(null);
  const [activeCuello, setActiveCuello] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const sectorMatch = activeSector === 'all' || product.sector === activeSector;
      const gramajeMatch =
        !activeGramaje ||
        (product.gramaje >= activeGramaje.min && product.gramaje <= activeGramaje.max);
      const cuelloMatch = !activeCuello || product.tipoCuello === activeCuello;
      return sectorMatch && gramajeMatch && cuelloMatch;
    });
  }, [activeSector, activeGramaje, activeCuello]);

  const clearFilters = () => {
    setActiveSector('all');
    setActiveGramaje(null);
    setActiveCuello(null);
  };

  const hasActiveFilters = activeSector !== 'all' || activeGramaje || activeCuello;

  return (
    <section id="productos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Catálogo de Productos
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestras <span className="text-gradient">Preformas PET</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Amplia variedad de preformas para todos los sectores industriales. 
            Diferentes gramajes y tipos de cuello para cada aplicación.
          </p>
        </motion.div>

        {/* Showcase Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 p-8">
            <img
              src={preformsLineup}
              alt="Línea de preformas Linda Plast"
              className="w-full max-w-4xl mx-auto"
            />
          </div>
        </motion.div>

        {/* Sector Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {sectors.map((sector) => {
            const Icon = sectorIcons[sector.id];
            return (
              <Button
                key={sector.id}
                variant={activeSector === sector.id ? 'default' : 'outline'}
                size="lg"
                onClick={() => setActiveSector(sector.id)}
                className="rounded-full flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {sector.label}
              </Button>
            );
          })}
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setShowFilters(!showFilters)}
            className="rounded-full flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Más filtros
          </Button>
        </div>

        {/* Technical Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-muted/50 rounded-2xl p-6 border border-border">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Gramaje Filter */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Gramaje</h4>
                    <div className="flex flex-wrap gap-2">
                      {gramajeRanges.map((range) => (
                        <Button
                          key={range.label}
                          variant={
                            activeGramaje?.min === range.min ? 'default' : 'outline'
                          }
                          size="sm"
                          onClick={() =>
                            setActiveGramaje(
                              activeGramaje?.min === range.min ? null : range
                            )
                          }
                          className="rounded-full"
                        >
                          {range.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Tipo de Cuello Filter */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">
                      Tipo de Cuello
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tipoCuelloOptions.map((cuello) => (
                        <Button
                          key={cuello}
                          variant={activeCuello === cuello ? 'default' : 'outline'}
                          size="sm"
                          onClick={() =>
                            setActiveCuello(activeCuello === cuello ? null : cuello)
                          }
                          className="rounded-full"
                        >
                          {cuello}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {hasActiveFilters && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-muted-foreground"
                    >
                      Limpiar todos los filtros
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          Mostrando {filteredProducts.length} productos
        </p>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">
              No se encontraron productos con los filtros seleccionados.
            </p>
            <Button variant="link" onClick={clearFilters} className="mt-2">
              Limpiar filtros
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;
