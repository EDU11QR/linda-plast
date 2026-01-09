import { motion } from 'framer-motion';
import { ShieldCheck, Recycle, Factory, Truck, Award, Leaf } from 'lucide-react';

const values = [
  {
    icon: ShieldCheck,
    title: 'Plástico de Mejor Calidad',
    description: 'Utilizamos resina PET virgen de grado alimenticio, garantizando la máxima pureza y resistencia en cada preforma.',
    color: 'primary',
  },
  {
    icon: Recycle,
    title: 'Envases 100% Reciclables',
    description: 'Comprometidos con la economía circular. Nuestras preformas son completamente reciclables, contribuyendo a un futuro sostenible.',
    color: 'secondary',
  },
  {
    icon: Factory,
    title: 'Tecnología de Punta',
    description: 'Maquinaria de última generación con sistemas de inyección de alta precisión para una calidad consistente.',
    color: 'primary',
  },
  {
    icon: Truck,
    title: 'Entrega a Nivel Nacional',
    description: 'Red logística optimizada para entregas puntuales en todo el país. Stock permanente para respuesta inmediata.',
    color: 'secondary',
  },
  {
    icon: Award,
    title: 'Certificaciones de Calidad',
    description: 'ISO 9001:2015 y BRC Packaging. Procesos auditados y trazabilidad completa en cada lote de producción.',
    color: 'primary',
  },
  {
    icon: Leaf,
    title: 'Responsabilidad Ambiental',
    description: 'Procesos de producción eficientes que minimizan residuos y optimizan el consumo de energía.',
    color: 'secondary',
  },
];

const ValueCards = () => {
  return (
    <section id="nosotros" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            ¿Por qué elegirnos?
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Compromiso con la <span className="text-gradient">Excelencia</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            En Linda Plast combinamos tecnología avanzada con un profundo compromiso ambiental
            para ofrecer las mejores soluciones en preformas PET.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-industrial rounded-2xl p-6 bg-card border border-border group"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${value.color === 'primary'
                    ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                    : 'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground'
                  }`}
              >
                <value.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueCards;
