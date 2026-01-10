import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Recycle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import preformHero from '@/assets/preform-hero.png';
import preforma46 from '@/assets/preforma46gr.png';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-secondary blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
              <Recycle className="w-4 h-4 text-secondary" />
              <span className="text-sm text-primary-foreground/90">Comprometidos con el medio ambiente</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Preformas PET de
              <span className="block text-secondary">Alta Calidad</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0">
              Fabricamos preformas PET para la industria de bebidas, alimentos, limpieza e higiene.
              Tecnología de punta y compromiso con la sostenibilidad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-base font-semibold rounded-full px-8 group"
              >
                {/* Redirige a la sección de productos */}
                <a href="#productos">
                  Conoce nuestros productos
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base font-semibold rounded-full px-8 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                {/* Redirige al WhatsApp del asesor */}
                <a
                  href="https://wa.me/51935315177"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contactar asesor
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-primary-foreground/20">
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-secondary">15+</p>
                <p className="text-sm text-primary-foreground/70">Años de experiencia</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-secondary">200M+</p>
                <p className="text-sm text-primary-foreground/70">Preformas/año</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-secondary">100%</p>
                <p className="text-sm text-primary-foreground/70">Reciclables</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/20 rounded-full blur-3xl scale-75" />
              <img
                src={preforma46}
                alt="Preforma PET Linda Plast"
                className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl"
              />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute top-10 right-0 bg-background rounded-2xl p-4 floating-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Certificación ISO</p>
                    <p className="text-xs text-muted-foreground">9001:2015</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
