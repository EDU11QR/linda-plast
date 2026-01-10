import { Product } from '@/types/product';

// Importar imágenes desde assets
// NOTA: Asegúrate de que los nombres de los archivos coincidan exactamente
import preformaBotella from '@/assets/preforma de botella.jpg';
import preforma46gr from '@/assets/bidon.png';
import preformaBidon from '@/assets/Preforma de bidon.webp';
import tapas from '@/assets/tapas de botella.png';
import jaba from '@/assets/jaba.avif';

export const products: Product[] = [
  {
    id: 'pf-001',
    name: 'Preforma PET 15g PCO',
    sector: 'alimentacion',
    gramaje: 15,
    tipoCuello: 'PCO',
    image: preformaBotella, // Usando la imagen importada
    description: 'Ideal para botellas de agua 500ml'
  },
  {
    id: 'pf-002',
    name: 'Preforma PET 20g PCO',
    sector: 'bebidas',
    gramaje: 20,
    tipoCuello: 'PCO',
    image: preforma46gr, // Usando otra imagen importada
    description: 'Perfecta para refrescos y jugos 600ml'
  },
  {
    id: 'pf-003',
    name: 'Preforma PET 28g 30/25',
    sector: 'bebidas',
    gramaje: 28,
    tipoCuello: '30/25',
    image: preformaBidon, // Usando otra imagen importada
    description: 'Para bebidas carbonatadas 1L'
  },
  {
    id: 'pf-004',
    name: 'Preforma PET 28g 30/25',
    sector: 'bebidas',
    gramaje: 28,
    tipoCuello: '30/25',
    image: tapas, // Usando otra imagen importada
    description: 'Para bebidas carbonatadas 1L'
  },
  {
    id: 'pf-005',
    name: 'Jaba',
    sector: 'alimentacion',
    gramaje: 28,
    tipoCuello: '30/25',
    image: jaba, // Usando otra imagen importada
    description: 'Para bebidas carbonatadas 1L'
  }
];

export const sectors = [
  { id: 'all', label: 'Todos', icon: 'Layers' },
  { id: 'bebidas', label: 'Bebidas', icon: 'GlassWater' },
  { id: 'alimentacion', label: 'Alimentación', icon: 'UtensilsCrossed' },
  { id: 'limpieza', label: 'Limpieza', icon: 'SprayCanIcon' },
  { id: 'higiene', label: 'Higiene', icon: 'Droplet' },
] as const;

export const gramajeRanges = [
  { min: 15, max: 25, label: '15g - 25g' },
  { min: 26, max: 35, label: '26g - 35g' },
  { min: 36, max: 50, label: '36g - 50g' },
] as const;

export const tipoCuelloOptions = ['PCO', '30/25', '28mm', '38mm'] as const;
