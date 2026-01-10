import { useState } from 'react';
import { motion } from 'framer-motion';
import { Factory, Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuote } from '@/context/QuoteContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useQuote();

  const navItems = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Productos', href: '#productos' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            {/* CAMBIAR LOGO */}
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Factory className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-primary leading-tight">LINDA PLAST</span>
              <span className="text-[10px] text-muted-foreground tracking-wider">PREFORMAS PET</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2"
              onClick={() => setIsOpen(true)}
            >
              <span className="relative">
                Lista de Cotización
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-4 w-5 h-5 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                    {totalItems}
                  </span>
                )}
              </span>
            </Button>
            <Button size="sm" className="hidden sm:flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {/* Redirige al WhatsApp del asesor */}
              <a
                href="https://wa.me/51935315177"
                target="_blank"
                rel="noopener noreferrer"
              >Contactar</a>
            </Button>
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-border"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button size="sm" className="w-full mt-2">
                Contactar Asesor
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
