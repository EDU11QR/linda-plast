import { Factory, Phone, Mail, MapPin, Linkedin, Facebook, Instagram, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contacto" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <a href="#hero" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <Factory className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight">LINDA PLAST</span>
                <span className="text-[10px] text-primary-foreground/60 tracking-wider">PREFORMAS PET</span>
              </div>
            </a>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Más de 15 años fabricando preformas PET de alta calidad para la industria peruana.
              Comprometidos con la innovación y la sostenibilidad.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/preforma.ahise.eirl/?rdid=Rxp5lVOjGjlWsrXn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Productos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#productos" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  Preformas para Bebidas
                </a>
              </li>
              <li>
                <a href="#productos" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  Preformas para Alimentación
                </a>
              </li>
              <li>
                <a href="#productos" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  Preformas para Limpieza
                </a>
              </li>
              <li>
                <a href="#productos" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  Preformas para Higiene
                </a>
              </li>
              <li>
                <a href="#productos" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  Soluciones Personalizadas
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Empresa</h4>
            <ul className="space-y-3">
              <li>
                <a href="#nosotros" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  Certificaciones
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  Sostenibilidad
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  Trabaja con Nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  Calle Sr. De los Milagros Mz. BQ2 LT 03B. Asc. El olivar del valle, Anexo 22 JicamarcaÑbr /Lima, Perú
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a href="tel:+51935315177" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  +51 935315177
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <a href="mailto:ventas@lindaplast.com" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  ventas@lindaplast.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © 2026 Linda Plast. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors">
              Términos de Servicio
            </a>
            <Link to="/admin" className="text-primary-foreground/30 hover:text-primary-foreground text-sm transition-colors flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span className="sr-only">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
